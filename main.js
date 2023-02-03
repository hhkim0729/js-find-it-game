'use strict';

const description = document.querySelector('.description');
const playBtn = document.querySelector('.play');
const stopBtn = document.querySelector('.stop');
const timer = document.querySelector('.timer');
const counter = document.querySelector('.counter');
const resultBox = document.querySelector('.result');
const replayBtn = document.querySelector('.replay');
const resultMessage = document.querySelector('.message');
const bottom = document.querySelector('.bottom');
const cats = document.querySelectorAll('.cat');
const penguins = document.querySelectorAll('.penguin');

const bgMusic = new Audio('/sound/bg.mp3');
const catSound = new Audio('/sound/cat.mp3');
const penguinSound = new Audio('/sound/penguin.mp3');
const alertSound = new Audio('/sound/alert.wav');
const winSound = new Audio('/sound/win.mp3');

const INITIAL_TIME = 10;

addEventListener('load', () => {
  const bottomRect = bottom.getBoundingClientRect();
  const catRect = cats[0].getBoundingClientRect();
  const maxTop = bottomRect.height - catRect.height;
  const maxLeft = bottomRect.width - catRect.width;
  const descRect = description.getBoundingClientRect();

  let time = INITIAL_TIME;
  let count = 10;
  let interval = null;

  function setTimer() {
    timer.innerHTML = `0:${time--}`;
    if (time < 0) {
      finishGame('YOU LOST!', alertSound);
    }
  }

  function displayRandom(element) {
    element.style.opacity = 1;
    element.style.pointerEvents = 'all';
    element.style.transform = `translate(${Math.random() * maxLeft}px,${
      Math.random() * maxTop
    }px)`;
  }

  function startGame() {
    // Play music
    bgMusic.currentTime = 0;
    bgMusic.play();

    // Hide play button and show stop button
    playBtn.classList.remove('visible');
    stopBtn.classList.add('visible');

    // Hide resultBox
    resultBox.classList.remove('visible');

    // Start timer
    setTimer();
    interval = setInterval(setTimer, 1000);

    // Set counter
    counter.innerHTML = count;

    // Display cats
    cats.forEach(displayRandom);
    penguins.forEach(displayRandom);
  }

  function finishGame(message, sound) {
    clearInterval(interval);
    bgMusic.pause();
    sound.play();
    resultMessage.innerHTML = message;
    resultBox.classList.add('visible');
    time = INITIAL_TIME;
    count = 10;
  }

  description.addEventListener('mouseover', (e) => {
    const type = e.target.dataset.type;
    if (type && e.target.nodeName === 'EM') {
      const img = description.querySelector(`.help_img[data-type='${type}'`);
      img.classList.add('visible');
      img.style.transform = `translateX(${e.clientX - descRect.x}px)`;
    }
  });

  description.addEventListener('mouseout', ({ target }) => {
    const visibleImg = description.querySelector('.help_img.visible');
    visibleImg && visibleImg.classList.remove('visible');
  });

  playBtn.addEventListener('click', () => {
    startGame();
  });

  stopBtn.addEventListener('click', () => {
    finishGame('Replay?', alertSound);
  });

  replayBtn.addEventListener('click', () => {
    startGame();
  });

  bottom.addEventListener('click', ({ target }) => {
    if (resultBox.classList.contains('visible')) return;

    const type = target.dataset.type;
    if (type) {
      if (type === 'penguin') {
        penguinSound.play();
        finishGame('YOU LOST!', alertSound);
      } else if (type === 'cat') {
        catSound.play();
        catSound.currentTime = 0;
        counter.innerHTML = --count;
        target.style.opacity = 0;
        target.style.pointerEvents = 'none';
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
