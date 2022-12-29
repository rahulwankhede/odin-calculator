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

function operate(operator, a, b){
	if (operator === '+') return add(a, b);
	else if (operator === '-') return subtract(a, b);
	else if (operator === '*') return multiply(a, b);
	else if (operator === '/') return divide(a, b);
	else return 'Undefined operator';
}

const input = document.querySelector('.input');
const output = document.querySelector('.output');

function appendNumberToInput(c){
	input.textContent += c;
}

function appendOperatorToInput(c){
	input.textContent = ['+', '-', '*', '/'].includes(input.textContent.slice(-1)) ? input.textContent.slice(0, -1) + c : input.textContent + c;
}

const numbers = document.querySelectorAll('div.numbers button');

for(let button of numbers){
	button.addEventListener('click', function(e){
		appendNumberToInput(button.id);
	});
}

const operators = document.querySelectorAll('div.operators button');

for(let operator of operators){
	operator.addEventListener('click', function(e){
		appendOperatorToInput(operator.id);
	});
}
