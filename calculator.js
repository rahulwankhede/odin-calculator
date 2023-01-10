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
const numberButtons = document.querySelectorAll('.numbers');
const operatorButtons = document.querySelectorAll('.xion');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');
const signButton = document.querySelector('.sign');
const percentButton = document.querySelector('.percentage');
const decimalButton = document.querySelector('.decimal');

let leftOperand, operator, rightOperand, ans;
let digitAppends = false;
let operatingGivesResult = false;
let operatorSet = false;
let decimalPresent = false;

function setDisplayToDigit(c){
	display.textContent = c;
}

function setDisplayToNumber(num){
	num = num.toString();
	if (num.length > 11){
		num = num.slice(0, 11);
	}

	display.textContent = num;
	decimalPresent = num.indexOf('.') >= 0;
}

function appendDigitToDisplay(c){
	if(display.textContent.length < 11){
		display.textContent += c;
	}
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
//	decimalPresent = false;
}

function addDecimal(){
	if (!decimalPresent){
		display.textContent += '.';
	}
	decimalPresent = true;
	digitAppends = true;
}

decimalButton.addEventListener('click', addDecimal);

function allClear(){
	resetAllVariables();
	clearDisplay();
	decimalPresent = false;
}

clearButton.addEventListener('click', allClear);

function changeSign(){
	display.textContent = display.textContent.slice(0, 1) == '-' ? display.textContent.slice(1) : '-' + display.textContent;
}

signButton.addEventListener('click', changeSign);

function getPercent(){
	if (display.textContent.length < 11){
		display.textContent = (parseFloat(display.textContent) / 100).toString().slice(0, 11);
		
		decimalPresent = (display.textContent.indexOf('.') >= 0);
	}
}

percentButton.addEventListener('click', getPercent);

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
	rightOperand = parseFloat(display.textContent);
	ans = operate(leftOperand, operator, rightOperand);
	setDisplayToNumber(ans);
	decimalPresent = (ans.toString()).indexOf('.') >= 0;
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
		decimalPresent = false;
		getResult();
		leftOperand = parseFloat(display.textContent);
		operator = e.target.id;
		digitAppends = false;
		operatorSet = true;
	}
	else {
		decimalPresent = false;
		leftOperand = parseFloat(display.textContent);
		operator = e.target.id;
		digitAppends = false;
		operatorSet = true;

	}
}

for(let operatorButton of operatorButtons){
	operatorButton.addEventListener('click', doSomething);
}
