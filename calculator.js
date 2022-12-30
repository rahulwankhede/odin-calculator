function add(a, b){
	return a + b;
}

function subtract(a, b){
	return a - b;
}

function multiply(a, b){
	return a * b;
}

function divide(a, b){
	return a / b;
}

function operate(a, operator, b){
	if (operator == '+') return add(a, b);
	else if (operator == '-') return subtract(a, b);
	else if (operator == '*') return multiply(a, b);
	else if (operator == '/') return divide(a, b);
	else return 'Undefined operator';
}

const display = document.querySelector('.display');
const numberButtons = document.querySelectorAll('div.numbers button');
const operatorButtons = document.querySelectorAll('div.xion button');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');

let leftOperand, operator, rightOperand, ans;
let digitAppends = false;
let operatingGivesResult = false;
let operatorSet = false;

function setDisplayToDigit(c){
	display.textContent = c;
}

function setDisplayToNumber(num){
	display.textContent = num;
}

function appendDigitToDisplay(c){
	display.textContent += c;
}

function clearDisplay(){
	display.textContent = '0';
}

function resetAllVariables(){
	leftOperand = undefined;
	operator = undefined;
	rightOperand = undefined;
	ans = undefined;
	digitAppends = false;
	operatingGivesResult = false;
	operatorSet = false;
}

function allClear(){
	resetAllVariables();
	clearDisplay();
}

clearButton.addEventListener('click', allClear);

for(let numberButton of numberButtons){
	numberButton.addEventListener('click', function(e){
		if (digitAppends){
			appendDigitToDisplay(e.target.id);
		}
		else{
			setDisplayToDigit(e.target.id);
			digitAppends = true;
			if (operatorSet){
				operatingGivesResult = true;
			}
		}
	});
}

function getResult(){
	rightOperand = parseInt(display.textContent);
	ans = operate(leftOperand, operator, rightOperand);
	setDisplayToNumber(ans);
}

function onEquals(){
	if (operatorSet){
		getResult();
		resetAllVariables();
	}
	operatingGivesResult = false;
}

equalsButton.addEventListener('click', onEquals);

function doSomething(e){
	if (operatingGivesResult){
		getResult();
		leftOperand = parseInt(display.textContent);
		operator = e.target.id;
		digitAppends = false;
		operatorSet = true;
	}
	else {
		leftOperand = parseInt(display.textContent);
		operator = e.target.id;
		digitAppends = false;
		operatorSet = true;
	}
}

for(let operatorButton of operatorButtons){
	operatorButton.addEventListener('click', doSomething);
}
