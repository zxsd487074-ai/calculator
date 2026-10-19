const MAX_DIGITS = 12;

const operations = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '×': (a, b) => a * b,
  '÷': (a, b) => a / b,
};

// Engineering functions applied to the number currently shown.
// null means the input is outside the function's domain.
const functions = {
  sqrt: (x) => (x < 0 ? null : Math.sqrt(x)),
  square: (x) => x * x,
  sin: (x) => Math.sin((x * Math.PI) / 180), // degrees
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

function applyFunction(name) {
  if (error) return;
  const result = functions[name](Number(current));
  if (result === null || !Number.isFinite(result)) {
    showError();
    return;
  }
  // Trim float noise: sin(180°) is 1.2e-16 in floating point, not 0.
  const rounded = Math.abs(result) < 1e-12 ? 0 : Number(result.toPrecision(10));
  current = String(rounded).length > MAX_DIGITS ? rounded.toExponential(6) : String(rounded);
  fresh = true;
}

function equals() {
  if (error || operator === null) return;
  if (!compute()) return;
  previous = null;
  operator = null;
  fresh = true;
}

document.querySelector('.calc').addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;

  if (btn.dataset.num !== undefined) inputDigit(btn.dataset.num);
  else if (btn.dataset.op !== undefined) inputOperator(btn.dataset.op);
  else if (btn.dataset.fn !== undefined) applyFunction(btn.dataset.fn);
  else if (btn.dataset.action === 'equals') equals();
  else if (btn.dataset.action === 'clear') reset();

  render();
});
