import { EFFECTS } from '../data/const.js';

const form = document.querySelector('.img-upload__form');
const imgPreview = form.querySelector('.img-upload__preview img');
const effectLevel = form.querySelector('.effect-level__value');
const slider = form.querySelector('.effect-level__slider');
const effectsList = form.querySelector('.effects');

noUiSlider.create(slider, {
  range: { min: 0, max: 100 },
  start: 100,
  step: 1,
  connect: 'lower'
});

let currentEffect = EFFECTS.none;

function updateEffect(value) {
  effectLevel.value = value;
  if (currentEffect.filter) {
    imgPreview.style.filter = `${currentEffect.filter}(${value}${currentEffect.unit || ''})`;
  } else {
    imgPreview.style.filter = '';
  }
}

slider.noUiSlider.on('update', (values) => {
  updateEffect(values[0])
});

effectsList.addEventListener('change', (evt) => {
  const effectName = evt.target.value;
  currentEffect = EFFECTS[effectName];

  slider.noUiSlider.updateOptions(currentEffect.options);
  updateEffect(currentEffect.options.start);
});

// сброс эффектов и размеров
export function resetEffects() {
  currentEffect = EFFECTS.none;
  slider.noUiSlider.updateOptions(currentEffect.options);
  updateEffect(currentEffect.options.start);
  imgPreview.style.filter = '';
}
