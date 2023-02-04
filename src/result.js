'use strict';

export default class Result {
  constructor() {
    this.resultBox = document.querySelector('.result');
    this.replayBtn = document.querySelector('.replay');
    this.message = document.querySelector('.message');
    this.replayBtn.addEventListener('click', () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  show(text) {
    this.message.innerHTML = text;
    this.resultBox.classList.add('visible');
  }

  hide() {
    this.resultBox.classList.remove('visible');
  }
}
