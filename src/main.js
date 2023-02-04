'use strict';

import Game from './game.js';
import Result from './result.js';

const description = document.querySelector('.description');

const INITIAL_TIME = 10;
const CAT_COUNT = 10;
const PENGUIN_COUNT = 7;

addEventListener('load', () => {
  const descRect = description.getBoundingClientRect();

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

  const game = new Game(CAT_COUNT, PENGUIN_COUNT, INITIAL_TIME);
  game.setGameStopListener((message) => {
    gameResult.show(message);
  });

  const gameResult = new Result();
  gameResult.setClickListener(() => {
    game.start();
  });
});
