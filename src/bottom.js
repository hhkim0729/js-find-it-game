'use strict';

import * as sound from './sound.js';

export default class Bottom {
  constructor(catCount, penguinCount) {
    this.catCount = catCount;
    this.penguinCount = penguinCount;
    this.bottom = document.querySelector('.bottom');
    this.bottomRect = this.bottom.getBoundingClientRect();
    this.bottom.addEventListener('click', this.onClick);
  }

  init() {
    this.bottom.innerHTML = '';
    this._addItem('cat', this.catCount, 'img/cat.png');
    this._addItem('penguin', this.penguinCount, 'img/penguin.png');
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  _randomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

  _addItem(className, count, path) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.bottomRect.width;
    const y2 = this.bottomRect.height;
    for (let i = 0; i < count; i++) {
      const item = document.createElement('img');
      item.setAttribute('class', className);
      item.setAttribute('alt', className);
      item.setAttribute('src', path);
      item.setAttribute('data-type', className);
      const x = this._randomNumber(x1, x2 - item.width);
      const y = this._randomNumber(y1, y2 - item.height);
      item.style.transform = `translate(${x}px,${y}px)`;
      this.bottom.appendChild(item);
    }
  }

  onClick({ target }) {
    const type = target.dataset.type;
    if (type) {
      if (type === 'penguin') {
        sound.playPenguin();
        this.onItemClick && this.onItemClick(type);
      } else if (type === 'cat') {
        sound.playCat();
        target.remove();
        this.onItemClick && this.onItemClick(type);
      }
    }
  }
}
