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

//  math equations
function add(a, b) {
  return a + b
};

function subtract(a,b) {
  return a - b
};

function divide(a,b) {
  if (b == 0) {
    alert('NOT IN MY HOUSE.');
    displayText.innerHTML = '';
    return
  };
  return a / b;
};

function multiply(a,b) {
  return a * b
};

function applyOperation(op, a = 0, b) {
  operation = '';
  return op(a,b)
};


function clickedNum(e) {
  keyPressed(e);
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

function keyPressed(e) {
  e.target.classList.add('pressed')
}

function removeTransition(e) {
  console.log('remove')
  e.target.classList.remove('pressed');
}

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
  keyPressed(e);
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
  if (aNum.toString().length > 13) {
    let [int, decimals] = aNum.toString().split('.')
    if(int > 10) {
      aNum = aNum.toPrecision(1+ 7);
      if (aNum.toString().length > 13) {
        return alert ('Error: Exceeded Maximum Output');
      };
    } else {
      aNum = `${int}.${Math.round(decimals / (10 ** (14-int)))}`
    }
  };
  displayText.innerHTML = aNum;
  isSolution = true;
  return
};

const operators = document.querySelectorAll('.operator');
operators.forEach(node => node.addEventListener("click", performOperation));

function deleteLastInput (e) {
  keyPressed(e);
  if (isSolution) return
  input = displayText.innerHTML;
  if (!input) return
  displayText.innerHTML = input.substring(0,input.length-1);
  return
}

const bksp = document.querySelector('.bksp');
bksp.addEventListener("click", deleteLastInput);

// keyboard support 

window.addEventListener('keydown', 
  function(e) {
    const btnPressed = document.querySelector(`div[data-key="${e.key}"]`);
    if (!btnPressed) return;
    btnPressed.click()
  }
);

const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => button.addEventListener('transitionend', removeTransition));