'use strict';

import { Bottom, ItemType } from './bottom.js';
import * as sound from './sound.js';

const Reason = Object.freeze({
  win: 'YOU WON!',
  lose: 'YOU LOST!',
  stop: 'Replay?',
});

// Builder Pattern
export default class GameBuilder {
  withCatCount(num) {
    this.catCount = num;
    return this;
  }

  withPenguinCount(num) {
    this.penguinCount = num;
    return this;
  }

  withInitialTime(time) {
    this.initialTime = time;
    return this;
  }

  build() {
    return new Game(this.catCount, this.penguinCount, this.initialTime);
  }
}

class Game {
  constructor(catCount, penguinCount, initialTime) {
    this.gameBottom = new Bottom(catCount, penguinCount);
    this.gameBottom.setClickListener(this.onItemClick);
    this.started = false;
    this.initialTime = initialTime;
    this.catCount = catCount;
    this.time = initialTime;
    this.count = catCount;
    this.interval = null;
    this.playBtn = document.querySelector('.play');
    this.timer = document.querySelector('.timer');
    this.counter = document.querySelector('.counter');
    this.playBtn.addEventListener('click', this.onClickPlayBtn);
  }

  onClickPlayBtn = () => {
    if (this.started) {
      this.finish(Reason.stop);
    } else {
      this.start();
    }
  };

  onItemClick = (type) => {
    if (!this.started) {
      return;
    }
    if (type) {
      if (type === ItemType.penguin) {
        this.finish(Reason.lose);
      } else if (type === ItemType.cat) {
        this.counter.innerHTML = --this.count;
        if (this.count === 0) {
          this.finish(Reason.win);
        }
      }
    }
  };

  _showStopButton() {
    const icon = document.querySelector('.fa-play');
    if (icon) {
      icon.classList.add('fa-stop');
      icon.classList.remove('fa-play');
    } else {
      this.playBtn.style.visibility = 'visible';
    }
  }

  _hideStopButton() {
    this.playBtn.style.visibility = 'hidden';
  }

  _setTimerText() {
    this.timer.innerHTML = `0:${this.time--}`;
    if (this.time < 0) {
      this.finishGame(Reason.lose);
    }
  }

  _startTimer() {
    this._setTimerText();
    this._showStopButtoninterval = setInterval(this.setTimerText, 1000);
    this.counter.innerText = this.count;
  }

  _initGame() {
    this.time = this.initialTime;
    this.count = this.catCount;
    this.gameBottom.init();
  }

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  start() {
    this.started = true;
    this._initGame();
    sound.playBackground();
    this._showStopButton();
    this._startTimer();
  }

  finish(reason) {
    this.started = false;
    clearInterval(this.interval);
    this._hideStopButton();
    sound.stopBackground();
    if (reason === Reason.win) {
      sound.playWin();
    } else {
      sound.playAlert();
    }
    this.onGameStop && this.onGameStop(reason);
  }
}
