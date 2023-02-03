'use strict';

const description = document.querySelector('.description');
const playBtn = document.querySelector('.play');
const timer = document.querySelector('.timer');
const counter = document.querySelector('.counter');
const resultBox = document.querySelector('.result');
const replayBtn = document.querySelector('.replay');
const resultMessage = document.querySelector('.message');
const bottom = document.querySelector('.bottom');

const bgMusic = new Audio('sound/bg.mp3');
const catSound = new Audio('sound/cat.mp3');
const penguinSound = new Audio('sound/penguin.mp3');
const alertSound = new Audio('sound/alert.wav');
const winSound = new Audio('sound/win.mp3');

const INITIAL_TIME = 10;
const CAT_COUNT = 10;
const PENGUIN_COUNT = 7;

let started = false;
let time = INITIAL_TIME;
let count = CAT_COUNT;
let interval = null;

addEventListener('load', () => {
  const bottomRect = bottom.getBoundingClientRect();
  const descRect = description.getBoundingClientRect();

  function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
  }

  function clearItems() {
    const cats = bottom.querySelectorAll('.cat');
    const penguins = bottom.querySelectorAll('.penguin');

    cats && cats.forEach((cat) => cat.remove());
    penguins && penguins.forEach((penguin) => penguin.remove());
  }

  function showStopButton() {
    const icon = document.querySelector('.fa-play');
    if (icon) {
      icon.classList.add('fa-stop');
      icon.classList.remove('fa-play');
    } else {
      playBtn.style.visibility = 'visible';
    }
  }

  function setTimerText() {
    timer.innerHTML = `0:${time--}`;
    if (time < 0) {
      finishGame('YOU LOST!', alertSound);
    }
  }

  function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

  function addItem(className, count, path) {
    const x1 = 0;
    const y1 = 0;
    const x2 = bottomRect.width;
    const y2 = bottomRect.height;
    for (let i = 0; i < count; i++) {
      const item = document.createElement('img');
      item.setAttribute('class', className);
      item.setAttribute('alt', className);
      item.setAttribute('src', path);
      item.setAttribute('data-type', className);
      const x = randomNumber(x1, x2 - item.width);
      const y = randomNumber(y1, y2 - item.height);
      item.style.transform = `translate(${x}px,${y}px)`;
      bottom.appendChild(item);
    }
  }

  function startGame() {
    started = true;

    playSound(bgMusic);
    clearItems();
    showStopButton();

    setTimerText();
    interval = setInterval(setTimerText, 1000);
    counter.innerText = count;

    addItem('cat', CAT_COUNT, 'img/cat.png');
    addItem('penguin', PENGUIN_COUNT, 'img/penguin.png');
  }

  function finishGame(message, sound) {
    started = false;

    clearInterval(interval);

    bgMusic.pause();
    playSound(sound);

    playBtn.style.visibility = 'hidden';
    resultMessage.innerHTML = message;
    resultBox.classList.add('visible');

    time = INITIAL_TIME;
    count = CAT_COUNT;
  }

  description.addEventListener('mouseover', (e) => {
    const type = e.target.dataset.type;
    if (type && e.target.nodeName === 'EM') {
      const img = description.querySelector(`.help_img[data-type='${type}'`);
      img.classList.add('visible');
      img.style.transform = `translateX(${e.clientX - descRect.x}px)`;
    }
  });

  description.addEventListener('mouseout', () => {
    const visibleImg = description.querySelector('.help_img.visible');
    visibleImg && visibleImg.classList.remove('visible');
  });

  playBtn.addEventListener('click', () => {
    if (started) {
      finishGame('Replay?', alertSound);
    } else {
      startGame();
    }
  });

  replayBtn.addEventListener('click', () => {
    startGame();
    resultBox.classList.remove('visible');
  });

  bottom.addEventListener('click', ({ target }) => {
    if (!started) {
      return;
    }

    const type = target.dataset.type;
    if (type) {
      if (type === 'penguin') {
        playSound(penguinSound);
        finishGame('YOU LOST!', alertSound);
      } else if (type === 'cat') {
        playSound(catSound);
        target.remove();
        counter.innerHTML = --count;
        if (count === 0) {
          finishGame('YOU WON!', winSound);
        }
      }
    }
  });

  bottom.addEventListener('mouseover', ({ target }) => {
    const type = target.dataset.type;
    if (type) {
      target.style.transform += 'scale(1.1)';
    }
  });

  bottom.addEventListener('mouseout', ({ target }) => {
    const type = target.dataset.type;
    if (type) {
      target.style.transform = target.style.transform.replace('scale(1.1)', '');
    }
  });
});
