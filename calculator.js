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

function addListeners(){
  let keys = document.getElementsByClassName('key');
  for (let i = 0; i < keys.length; i++){
    keys[i].addEventListener('click', processClick);
  }
  document.addEventListener('keypress', processKeypress);
} // addListeners()

function processClick(evt){
  interpretEntry(evt.target.id);
} // processClick(evt)

function processKeypress(evt){
  interpretEntry(evt.key);
} // processKeypress(evt)

function interpretEntry(key){
  console.log(key);
} // interpretEntry(key)

function addEntry(int){
  entries.push(int);
} // addEntry(int)

function updateScreen(){
  document.getElementById('numbers').textContent = entries.join("");
}

function calculate(){

} // calculate()
