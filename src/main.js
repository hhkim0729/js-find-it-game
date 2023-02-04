'use strict';

import Result from './result.js';
import Bottom from './bottom.js';
import * as sound from './sound.js';

const description = document.querySelector('.description');
const playBtn = document.querySelector('.play');
const timer = document.querySelector('.timer');
const counter = document.querySelector('.counter');

const INITIAL_TIME = 10;
const CAT_COUNT = 10;
const PENGUIN_COUNT = 7;

let started = false;
let time = INITIAL_TIME;
let count = CAT_COUNT;
let interval = null;

addEventListener('load', () => {
  const descRect = description.getBoundingClientRect();

  const gameResult = new Result();
  gameResult.setClickListener(() => {
    startGame();
  });

  const gameBottom = new Bottom(CAT_COUNT, PENGUIN_COUNT);
  gameBottom.setClickListener((type) => onItemClick(type));

  function onItemClick(type) {
    if (!started) {
      return;
    }
    if (type) {
      if (type === 'penguin') {
        sound.playPenguin();
        finishGame('YOU LOST!', false);
      } else if (type === 'cat') {
        counter.innerHTML = --count;
        if (count === 0) {
          sound.playCat();
          finishGame('YOU WON!', true);
        }
      }
    }
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

  function hideStopButton() {
    playBtn.style.visibility = 'hidden';
  }

  function setTimerText() {
    timer.innerHTML = `0:${time--}`;
    if (time < 0) {
      finishGame('YOU LOST!', false);
    }
  }

  function startTimer() {
    setTimerText();
    interval = setInterval(setTimerText, 1000);
    counter.innerText = count;
  }

  function initGame() {
    time = INITIAL_TIME;
    count = CAT_COUNT;
    gameBottom.init();
  }

  function startGame() {
    started = true;
    initGame();
    sound.playBackground();
    showStopButton();
    startTimer();
  }

  function finishGame(message, win) {
    started = false;
    clearInterval(interval);
    hideStopButton();
    sound.stopBackground();
    if (win) {
      sound.playWin();
    } else {
      sound.playAlert();
    }
    gameResult.show(message);
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
      finishGame('Replay?', false);
    } else {
      startGame();
    }
  });
});
