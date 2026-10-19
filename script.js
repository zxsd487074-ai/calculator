const MAX_DIGITS = 12;

const operations = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '×': (a, b) => a * b,
  '÷': (a, b) => a / b,
};

const display = document.getElementById('display');

let current = '0';   // number being typed (string)
let previous = null; // left operand
let operator = null; // pending operator
let fresh = false;   // next digit starts a new number
let error = false;

function render() {
  display.textContent = current;
}

function reset() {
  current = '0';
  previous = null;
  operator = null;
  fresh = false;
  error = false;
}

function showError() {
  reset();
  current = 'Error';
  error = true;
}

// Run the pending operation; returns false if it failed (e.g. divide by 0).
function compute() {
  if (operator === null) return true;
  const b = Number(current);
  if (operator === '÷' && b === 0) {
    showError();
    return false;
  }
  const result = operations[operator](previous, b);
  current = String(result).length > MAX_DIGITS ? result.toExponential(6) : String(result);
  return true;
}

function inputDigit(d) {
  if (error) reset();
  if (fresh || current === '0') {
    current = d;
    fresh = false;
  } else if (current.replace('-', '').length < MAX_DIGITS) {
    current += d;
  }
}

function inputOperator(op) {
  if (error) return;
  // Pressing operators back to back: just replace the operator.
  if (operator !== null && fresh) {
    operator = op;
    return;
  }
  if (!compute()) return;
  previous = Number(current);
  operator = op;
  fresh = true;
}

function equals() {
  if (error || operator === null) return;
  if (!compute()) return;
  previous = null;
  operator = null;
  fresh = true;
}

document.querySelector('.keys').addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;

  if (btn.dataset.num !== undefined) inputDigit(btn.dataset.num);
  else if (btn.dataset.op !== undefined) inputOperator(btn.dataset.op);
  else if (btn.dataset.action === 'equals') equals();
  else if (btn.dataset.action === 'clear') reset();

  render();
});
