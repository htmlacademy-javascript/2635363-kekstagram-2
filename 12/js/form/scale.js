import { SCALE_MIN, SCALE_MAX, SCALE_STEP, SCALE_DEFAULT } from "../data/const.js";

let currentScale = 100;

const form = document.querySelector('.img-upload__form');
const imgPreview = form.querySelector('.img-upload__preview img');
const smallerButton = form.querySelector('.scale__control--smaller');
const biggerButton = form.querySelector('.scale__control--bigger');
const scaleControl = form.querySelector('.scale__control--value');

function setScale(value) {
  currentScale = value;
  scaleControl.value = `${value}%`;
  imgPreview.style.transform = `scale(${value / 100})`;
}

smallerButton.addEventListener('click', () => {
  if (currentScale > SCALE_MIN) {
    setScale(currentScale - SCALE_STEP);
  }
});

biggerButton.addEventListener('click', () => {
  if (currentScale < SCALE_MAX) {
    setScale(currentScale + SCALE_STEP);
  }
});

setScale(SCALE_DEFAULT);

// сброс размера изображения
export function resetScale() {
  setScale(SCALE_DEFAULT);
}
