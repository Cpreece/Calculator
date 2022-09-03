let aNum;
let operation;
let isSolution = false;
let displayText = document.querySelector('.display-text');

function getInput() { 
  let rawInput =  displayText.innerHTML;
  if (rawInput == '') {
    return ''
  } else if (parseFloat(rawInput) == NaN) {
    throw alert('please enter a number') 
  } else return rawInput
};

function add(a, b) {
  return a + b
};

function subtract(a,b) {
  return a - b
};

function divide(a,b) {
  if (b == 0) {
    alert('Not in my house.');
    displayText.innerHTML = '';
    return
  };
  return a / b;
};

function multiply(a,b) {
  return a * b
};

function applyOperation(op, a, b) {
  operation = '';
  return op(a,b)
};


function clickedNum(e) {
  if (isSolution) {
   displayText.innerHTML = ''
   isSolution = false
  };
  let input = getInput();
  if (input.length > 13) return
  if (input == '0') {
    if (e.target.innerHTML == '0') return 
    displayText.innerHTML = e.target.innerHTML;
    return
  };
  if (input.includes('.') && e.target.innerHTML == '.') return
  input += e.target.innerHTML;
  displayText.innerHTML = input;
  return
};


const numberKeys = document.querySelectorAll('.num');
numberKeys.forEach(node => node.addEventListener("click", clickedNum));

function clickedClear() {
  displayText.innerHTML = '';
  aNum = '';
  operation = '';
  isSolution = false;
  return
};

const clear = document.querySelector('.clear');
clear.addEventListener("click", clickedClear);

function getOperator(symbol) {
  if (symbol == '+') {
    return add 
  } else if (symbol == '-') {
    return subtract
  } else if(symbol == '÷') {
    return divide 
  } else if (symbol == 'x') {
    return multiply  
  };
};

function performOperation(e) {
  const nextOperation = getOperator(e.target.innerHTML);
  input = displayText.innerHTML;
  if (input == '') return
  if (!aNum || !operation) {
    if (nextOperation == applyOperation) return
    aNum = input;
    operation = nextOperation;
  } else {
    aNum = operation(parseFloat(aNum), parseFloat(input));
    operation = nextOperation;
  };
  displayText.innerHTML = aNum;
  isSolution = true;
  return
};

const operators = document.querySelectorAll('.operator');
operators.forEach(node => node.addEventListener("click", performOperation));

function deleteLastInput (e) {
  if (isSolution) return
  input = displayText.innerHTML;
  if (!input) return
  displayText.innerHTML = input.substring(0,input.length-1);
  return
}

const bksp = document.querySelector('.bksp');
bksp.addEventListener("click", deleteLastInput);

