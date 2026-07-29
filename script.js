const display = document.getElementById('inputBox');
const buttons = document.querySelectorAll('[data-value]');
const operators = ['+', '-', '*', '/', '%'];

let expression = '';

function updateDisplay() {
  display.value = expression;
}

function addValue(value) {
  if (expression === 'Error') expression = '';

  const lastValue = expression.slice(-1);

  // Do not start with an operator, except for a negative number.
  if (!expression && operators.includes(value) && value !== '-') return;

  // Replace an operator when another operator is pressed.
  if (operators.includes(value) && operators.includes(lastValue)) {
    expression = expression.slice(0, -1);
  }

  // Each number can have only one decimal point.
  if (value === '.') {
    const currentNumber = expression.split(/[+\-*/%]/).pop();
    if (currentNumber.includes('.')) return;
    if (!currentNumber) expression += '0';
  }

  expression += value;
}

function calculate() {
  if (!expression || operators.includes(expression.slice(-1))) return;

  try {
    // The display is readonly and expression is built only from calculator buttons.
    expression = String(eval(expression));
    if (!Number.isFinite(Number(expression))) throw new Error();
  } catch {
    expression = 'Error';
  }
}

function handleButton(value) {
  if (value === 'AC') expression = '';
  else if (value === 'DEL') expression = expression.slice(0, -1);
  else if (value === '=') calculate();
  else addValue(value);

  updateDisplay();
}

buttons.forEach((button) => {
  button.addEventListener('click', () => handleButton(button.dataset.value));
});

document.addEventListener('keydown', (event) => {
  if ('0123456789.+-*/%'.includes(event.key)) handleButton(event.key);
  else if (event.key === 'Enter' || event.key === '=') handleButton('=');
  else if (event.key === 'Backspace') handleButton('DEL');
  else if (event.key === 'Escape') handleButton('AC');
});
