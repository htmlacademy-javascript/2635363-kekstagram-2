import { EFFECTS, FILE_TYPES } from './data/const.js';
import { resetEffects } from './form/effects.js';

const fileInput = document.querySelector('#upload-file');
const overlay = document.querySelector('.img-upload__overlay');
const previewImg = document.querySelector('.img-upload__preview img');
const cancelButton = document.querySelector('#upload-cancel');
const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');
const effectPreview = document.querySelectorAll('.effects__preview');

let currentEffect = 'none';

applyEffect();

function toggleSlider(show) {
  const sliderFieldset = document.querySelector('.img-upload__effect-level');
  if (show) {
    sliderFieldset.classList.remove('hidden');
  } else {
    sliderFieldset.classList.add('hidden');
  }
}

function applyEffect() {
  const effectData = EFFECTS[currentEffect];
  const effectLevelInput = document.querySelector('.effect-level__value');

  if (!effectData || currentEffect === 'none') {
    toggleSlider(false);
    previewImg.style.filter = '';
    effectLevelInput.value = '0';
    return;
  }

  toggleSlider(true);
  const value = effectData.options.start;
  const unit = effectData.unit || '';
  previewImg.style.filter = `${effectData.filter}(${value}${unit || ''})`;
  effectLevelInput.value = value.toFixed(1);
}

function initEffectChangeListeners() {
  const radios = document.querySelectorAll('.effects__radio');
  radios.forEach(addEffectChangeListener);
}

function addEffectChangeListener(radio) {
  radio.addEventListener('change', onEffectChange);
}

function onEffectChange(evt) {
  currentEffect = evt.target.value;
  applyEffect();
}

initEffectChangeListeners();

function resetForm() {
  fileInput.value = '';
  previewImg.src = 'img/upload-default-image.jpg';
  descriptionInput.value = '';
  hashtagsInput.value = '';
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  resetEffects();

  document.removeEventListener('keydown', onEscKeyDown);
}

function onCancelButtonClick() {
  resetForm();
}

function onEscKeyDown(evt) {
  if (evt.key === 'Escape' && !document.querySelector('.error__inner')) {
    resetForm();
  }
}

cancelButton.addEventListener('click', onCancelButtonClick);

fileInput.addEventListener('change', onFileInputChange);

function onFileInputChange(evt) {
  const file = evt.target.files[0];
  if (!file) {
    return;
  }

  const fileName = file.name.toLowerCase();

  function getExtensionMatch(ext) {
    return fileName.endsWith(ext);
  }

  const matches = FILE_TYPES.some(getExtensionMatch);

  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', onFileReaderLoad);
    reader.readAsDataURL(file);
  } else {
    const errorTemplate = document.querySelector('#error').content.cloneNode(true);
    document.body.append(errorTemplate);
  }
}

function onFileReaderLoad(evt) {
  previewImg.src = evt.target.result;
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  for (let i = 0; i < effectPreview.length; i++) {
    effectPreview[i].style.backgroundImage = `url(${evt.target.result})`;
  }

  document.addEventListener('keydown', onEscKeyDown);
}
