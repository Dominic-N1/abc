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

let path = '';
const rows = [10, 9, 7];
const numrows = [6, 5];
const rowsTag = document.querySelectorAll('.row');
const setTag = document.querySelectorAll('.set');

const cleanFunc = function () {
  for (let j = 0; j < setTag.length; j++) {
    setTag[j].innerHTML = '';
  }
  for (let j = 0; j < rowsTag.length; j++) {
    rowsTag[j].innerHTML = '';
  }
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

const logicABC = function (path) {
  const buttonsNum = document.querySelectorAll('.num');
  const buttons = document.querySelectorAll('.drum');

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () {
      triger(this, path + this.innerText.toLowerCase());
    });
  }
  for (let i = 0; i < buttonsNum.length; i++) {
    buttonsNum[i].addEventListener('click', function () {
      triger(this, this.innerText);
    });
  }
};
logicABC('abclong/');

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
    logicABC('abc/');
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
    logicABC('');
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
    logicABC('abclong/');
  } else console.log('Something Wrong');
  triger(this, 'yellow');
});

document.addEventListener('keypress', e => {
  let course = e.key;
  const oneMore = document.querySelector('.btnChange').innerText;
  console.log(oneMore);
  switch (oneMore) {
    case 'ABC🏳‍🌈':
      path = 'abclong/';
      break;
    case 'QWERTY🏳‍🌈':
      path = 'abc/';
      break;
    case 'NUMBERS🏳‍🌈':
      path = '';
      course = 'Digit' + e.key;
      break;
    default:
      console.log('Something Wrong!');
      break;
  }
  // console.log(findKeypress(course).innerText);
  console.log(course);
  console.log(document.getElementsByClassName(course)[0]?.innerText);
  e.key.toUpperCase() === document.getElementsByClassName(course)[0]?.innerText
    ? triger(document.getElementsByClassName(course)[0], path + e.key)
    : '';
});
