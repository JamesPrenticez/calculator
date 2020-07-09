/********************************************************** 
 *  file:     calculator.js
 *  purpose:  Basic Calculator Logic
 *  author:   Anthony McGrath (akm@anthonykyle.co.nz)
 ******************************************************** */

/*********************************************************
 * Define Global Variables
 *********************************************************/
var entries   = [];   // Array for storing entered numbers
var prevEntry = [];   // Array for storing previous number
var temp      = 0;    // Temporary location for storing processed numbers
var operand   = "+";  // Operand Memory
var pct       = false;// Toggle for identifying if last action was percent

/*********************************************************
 * Add Event Listeners
 *********************************************************/
document.addEventListener('DOMContentLoaded', addListeners);

function addListeners(){
  let keys = document.getElementsByClassName('key');
  for (let i = 0; i < keys.length; i++){
    keys[i].addEventListener('click', processClick);
  }
  document.addEventListener('keydown', processKeypress);
} // addListeners()

/*********************************************************
 * Handle User Input
 *********************************************************/
function processClick(evt){
  interpretEntry(evt.target.id);
  evt.target.blur();
} // processClick(evt)

function processKeypress(evt){
  interpretEntry(evt.key);
} // processKeypress(evt)

function interpretEntry(key){
  switch (key){
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      addEntry(parseFloat(key));
      break;
    case ".":
      if (entries.includes(".")){
        break;
      }
      addEntry(key);
      break;
    case "+":
    case "-":
    case "*":
    case "/":
      addOperand(key);
      break;
    case "%":
      calcPercent();
      break;
    case "ac":
    case "Escape":
      allClear();
      break;
    case "ce":
      clearEntry();
      break;    
    case "Enter":
      calculate(true);
      break;
    case "Backspace":
      removeLastEntry();
      break;
  };
} // interpretEntry(key)

/*********************************************************
 * User Input Function Calls
 *********************************************************/
function addEntry(int){
  pct = false;
  entries.push(int);
  updateScreen(convertEntries(entries));
} // addEntry(int)

function addOperand(key){
  let newOperand = key
  switch(newOperand){
    case "+":
      toggleOperandDisplay("plus");
      break;
    case "-":
      toggleOperandDisplay("minus");
      break;
    case "*":
      toggleOperandDisplay("multiply");
      break;
    case "/":
      toggleOperandDisplay("divide");
      break;
    default:
      toggleOperandDisplay("");
      break;
  };
  calculate(false);
  operand = newOperand;
} // addOperand(key)

function calcPercent(){
  let percent = (convertEntries(entries) / 100);
  
  switch (operand){
    case "+":
      percent += 1;
      temp = (temp * percent);
      break;
    case "-":
      percent = 1 - percent;
      temp = (temp * percent);
      break;
    case "*":
    case "/":
      temp = eval(temp + operand + percent);
      break;
  }
  updateScreen(temp);
  prevEntry = [];
  prevEntry.push(percent);
  entries = [];
  pct = true;
} // calcPercent()

function allClear(){
  temp = 0;
  operand = "+";
  clearEntry();
  updateScreen(temp);
  toggleOperandDisplay("");
} // allClear()

function clearEntry(){
  entries = [];
  updateScreen(0);
  pct = false;
  prevEntry = [];
} // clearEvent()

function calculate(bool){
  if (entries.length > 0){
    prevEntry = entries;
    temp = eval(temp + operand + convertEntries(entries));
  } else {
    if (prevEntry.length > 0 && bool == true){
      if (pct == false){
        temp = eval(temp + operand + convertEntries(prevEntry));
      } else {
        temp = eval(temp * prevEntry);
      }
    } else if (prevEntry.length > 0 && bool == false){
      entries.push(temp);
    } else {
      temp = eval(temp + operand + "0");
    }
  }

  entries = [];
  updateScreen(temp);
} // calculate(bool)

function removeLastEntry(){
  if (entries.length > 0){
    entries.pop();
    updateScreen(convertEntries(entries));
  } // if
} // removeLastEntry()

/*********************************************************
 * Display Functions
 *********************************************************/
function updateScreen(val){
  let numbers = document.getElementById('numbers');
  if (val.toString().length > 12){
    numbers.classList.add('splitLine');
  } else {
    numbers.classList.remove('splitLine');
  }
  numbers.textContent = val;
} // updateScreen(val)

function convertEntries(arr){
  if (arr.length > 0){
    return parseFloat(arr.join(""));
  } else {
    return 0;
  }
} // convertEntries(arr)

function toggleOperandDisplay(oper){
  let opClass = document.getElementsByClassName("operand");
  for (let i = 0; i < opClass.length; i++){
    if (opClass[i].id == oper){
      opClass[i].style.display = "block";
    } else {
      opClass[i].style.display = "none";
    } 
  }
} // toggleOperandDisplay(operand)




