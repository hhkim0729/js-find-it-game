'use strict';

const bgMusic = new Audio('sound/bg.mp3');
const catSound = new Audio('sound/cat.mp3');
const penguinSound = new Audio('sound/penguin.mp3');
const alertSound = new Audio('sound/alert.wav');
const winSound = new Audio('sound/win.mp3');

export function playBackground() {
  playSound(bgMusic);
}

export function stopBackground() {
  stopSound(bgMusic);
}

export function playCat() {
  playSound(catSound);
}

export function playPenguin() {
  playSound(penguinSound);
}

export function playAlert() {
  playSound(alertSound);
}

export function playWin() {
  playSound(winSound);
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}
