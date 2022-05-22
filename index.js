'use strict';
// prettier-ignore
const qwerty = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];

const numbers = function () {
  const num = [];
  for (let i = 0; i <= 10; i++) {
    num.push(i);
  }
  return num;
};

let path = 'abclong/';
const rows = [10, 9, 7];
const numrows = [6, 5];
const rowsTag = document.getElementsByClassName('row');
const setTag = document.getElementsByClassName('set');

const cleanFunc = function () {
  Array.from(rowsTag).forEach(el => (el.innerHTML = ''));
  Array.from(setTag).forEach(el => (el.innerHTML = ''));
};
const num = function () {
  const num = numbers();
  cleanFunc();
  for (let j = 0; j < numrows.length; j++) {
    for (let i = 0; i < numrows[j]; i++) {
      let symbol = num.shift();
      setTag[j].insertAdjacentHTML(
        'beforeend',
        `<button class="Digit${symbol} color-${
          i < 6 ? i : i - 6
        } num drum__style">${symbol}</button>`
      );
    }
  }
};
const abc = function (arr) {
  cleanFunc();
  for (let j = 0; j < rows.length; j++) {
    for (let i = 0; i < rows[j]; i++) {
      let letter = arr.shift();
      rowsTag[j].insertAdjacentHTML(
        'beforeend',
        `<button class="${letter} drum color-${
          i < 6 ? i : i - 6
        } drum__style">${letter.toUpperCase()}</button>`
      );
    }
  }
};
abc(new Array(...qwerty).sort());

const triger = function (arg1, arg2) {
  arg1.classList.add('pressed');
  setTimeout(() => arg1.classList.remove('pressed'), 100);
  new Audio(`sounds/${arg2}.mp3`).play();
};

const logicABC = function () {
  document.body.addEventListener('mousedown', function (e) {
    e.target.classList.contains('drum') &&
      triger(e.target, path + e.target.innerText.toLowerCase());
    e.target.classList.contains('num') && triger(e.target, e.target.innerText);
  });
};
logicABC();

document.querySelector('.btnChange').addEventListener('click', function () {
  if (this.classList.contains('abc')) {
    this.classList.remove('abc');
    this.classList.add('qwerty');
    this.innerHTML = '';
    let i = 5;
    for (const symbol of 'QWERTY') {
      this.insertAdjacentHTML(
        'beforeend',
        `<span class="color-${i >= 0 ? i : i + 6}">${symbol}</span>`
      );
      i--;
    }
    this.insertAdjacentHTML('beforeend', `<span>🏳‍🌈</span>`);
    abc(new Array(...qwerty));
    path = 'abc/';
  } else if (this.classList.contains('qwerty')) {
    this.classList.remove('qwerty');
    this.classList.add('numbers');
    this.innerHTML = '';
    let i = 5;
    for (const symbol of 'NUMBERS') {
      this.insertAdjacentHTML(
        'beforeend',
        `<span class="color-${i >= 0 ? i : i + 6}">${symbol}</span>`
      );
      i--;
    }
    this.insertAdjacentHTML('beforeend', `<span>🏳‍🌈</span>`);
    num();
    path = '';
  } else if (this.classList.contains('numbers')) {
    this.classList.remove('numbers');
    this.classList.add('abc');
    this.innerHTML = '';
    let i = 5;
    for (const symbol of 'ABC') {
      this.insertAdjacentHTML(
        'beforeend',
        `<span class="color-${i >= 0 ? i : i + 6}">${symbol}</span>`
      );
      i -= 2;
    }
    this.insertAdjacentHTML('beforeend', `<span>🏳‍🌈</span>`);
    abc(new Array(...qwerty).sort());
    path = 'abclong/';
  } else console.log('Something Wrong');
  triger(this, 'yellow');
});

document.addEventListener('keypress', e => {
  e.key.toUpperCase() ===
    document.getElementsByClassName(
      Number.isInteger(+e.key) ? 'Digit' + e.key : e.key
    )[0]?.innerText &&
    triger(
      document.getElementsByClassName(
        Number.isInteger(+e.key) ? 'Digit' + e.key : e.key
      )[0],
      path + e.key
    );
});
