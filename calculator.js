// functions:
//       AC = clear entry + clear memory
//       CE = clear entry
//       % = calculate percentage
//       / = divide
//       x = multiply
//       - = subtract
//       + = add
//       = = process

//       When you click on a button, add to array of numbers which are readout on screen
//       click a modifier save entries as number to temporary placeholder
//       add next lot of numbers to array
//       on clicking any other button, perform arithmatic between entered and stored numbers. 
//       display result, add to temp

document.addEventListener('DOMContentLoaded', addListeners);

var entries = []; // Array for storing entered numbers
var temp = 0;     // Temporary location for storing processed numbers
var operand = "";

function addListeners(){
  let keys = document.getElementsByClassName('key');
  for (let i = 0; i < keys.length; i++){
    keys[i].addEventListener('click', processClick);
  }
  document.addEventListener('keydown', processKeypress);
} // addListeners()

function processClick(evt){
  interpretEntry(evt.target.id);
} // processClick(evt)

function processKeypress(evt){
  interpretEntry(evt.key);
} // processKeypress(evt)

function interpretEntry(key){
  console.log(key);
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
      addEntry(parseInt(key));
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
      clearEvent();
      break;    
    case "Enter":
      calculate();
      break;
  };
} // interpretEntry(key)

function updateScreen(bool){
  let screen = document.getElementById('numbers');

  if (bool === true){
    screen.textContent = entries.join("");
  } else {
    screen.textContent = "--MEM.ERR--";
  }  
} // updateScreen(bool)

function addEntry(int){
  if (entries.length < 12){
    entries.push(int);
    updateScreen(true);
  } else {
    updateScreen(false);
  }
} // addEntry(int)

function addOperand(key){
  if (entries.length > 1){
    temp = parseFloat(entries.join(""));
    entries = [];
  }  
  operand = key;
  switch(operand){
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
  };
} // addOperand(key)

function toggleOperandDisplay(operand){
  let opClass = document.getElementsByClassName("operand");
  for (let i = 0; i < opClass.length; i++){
    if (opClass[i].id == operand){
      opClass[i].style.display = "block";
    } else {
      opClass[i].style.display = "none";
    }
    
  }

} // toggleOperandDisplay(operand)

function calcPercent() {

} // calcPercent()

function allClear(){

} // allClear()

function clearEvent(){

} // clearEvent()

function calculate(){

} // calculate()
