/*

let display = document.querySelector('#display');
let buttons = document.querySelectorAll('button');
let specialChars = ['%', '*', '/', '-', '+', '='];
let output = '';

function calculate(btnValue) {
  if (btnValue === '=' && output !== '') {
    output = eval(output.replace('%', '/100'));
  } else if (btnValue === 'AC') {
    output = '';
  } else if (btnValue === 'DEL') {
    output = output.toString().slice(0, -1);
  } else {
    if (output === '' && specialChars.includes(btnValue)) return;
    output += btnValue;
  }

  display.value = output;
}

buttons.forEach((button) => {
  button.addEventListener('click', (e) => calculate(e.target.dataset.value));
});

*/

let display = document.querySelector('#display');
let buttons = document.querySelectorAll('button');
let specialChars = ['%', '×', '÷', '-', '+', '='];
let output = '';
let justCalculated = false;

function calculate(btnValue) {
  if (btnValue === '=' && output !== '') {
    try {
      // استبدال الرموز الرياضية بالقيم اللي JavaScript يفهمها
      let expression = output
        .replace(/÷/g, '/')
        .replace(/×/g, '*')
        .replace(/%/g, '/100');

      let result = eval(expression);

      // التحقق من نتيجة غير صالحة (NaN أو Infinity)
      if (!isFinite(result)) {
        output = 'Error';
      } else {
        output = result.toString();
      }

      justCalculated = true;
    } catch {
      output = 'Error'; // ✅ نص عادي
      justCalculated = true;
    }
  } else if (btnValue === 'AC') {
    output = '';
    justCalculated = false;
  } else if (btnValue === 'DEL') {
    output = output.toString().slice(0, -1);
  } else {
    if (justCalculated) {
      if (specialChars.includes(btnValue) && btnValue !== '=') {
        justCalculated = false;
      } else if (!specialChars.includes(btnValue)) {
        output = '';
        justCalculated = false;
      }
    }

    if (output === '' && specialChars.includes(btnValue) && btnValue !== '-')
      return;

    let lastChar = output.slice(-1);

    if (
      specialChars.includes(lastChar) &&
      specialChars.includes(btnValue) &&
      btnValue !== '='
    ) {
      output = output.slice(0, -1) + btnValue;
    } else if (btnValue === '.') {
      let parts = output.split(/[+\-×÷]/);
      let lastNumber = parts[parts.length - 1];
      if (lastNumber.includes('.')) return;
      output += btnValue;
    } else {
      output += btnValue;
    }
  }

  display.value = output;
}

buttons.forEach((button) => {
  button.addEventListener('click', (e) => calculate(e.target.dataset.value));
});
