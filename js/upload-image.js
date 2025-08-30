import { renderThumbnails } from './render-thumbnails.js';
import { photos } from './data/data.js';
import { EFFECTS, FILE_TYPES } from './data/const.js';
import { createPhoto } from './data/photo-template.js';

const fileInput = document.querySelector('#upload-file');
const overlay = document.querySelector('.img-upload__overlay');
const previewImg = document.querySelector('.img-upload__preview img');
const cancelButton = document.querySelector('#upload-cancel');
const submitButton = document.querySelector('.img-upload__submit');
const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');

let currentEffect = 'none';
let currentScale = 100;

applyEffect();

function applyEffect() {
  const effectData = EFFECTS[currentEffect];
  const slider = document.querySelector('.effect-level__slider');

  if (!effectData || currentEffect === 'none') {
    previewImg.style.filter = '';
    slider.classList.add('hidden');
    return;
  }

  slider.classList.remove('hidden');
  const value = effectData.options.start;
  const unit = effectData.unit;
  previewImg.style.filter = effectData.filter ? `${effectData.filter}(${value}${unit || ''})` : '';

}

document.querySelectorAll('.effects__radio').forEach((radio) => {
  radio.addEventListener('change', () => {
    currentEffect = radio.value;
    applyEffect();
  });
});

function resetForm() {
  fileInput.value = '';
  previewImg.src = 'img/upload-default-image.jpg';
  descriptionInput.value = '';
  hashtagsInput.value = '';
  currentEffect = 'none';
  currentScale = 100;
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.querySelector('.text__hashtags').value = '';
  applyEffect();
}

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (!file) {
    return;
  }

  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((ext) => fileName.endsWith(ext));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      previewImg.src = reader.result;
      overlay.classList.remove('hidden');
      document.body.classList.add('modal-open');
    });

    reader.readAsDataURL(file);
  } else {
    const errorTemplate = document.querySelector('error').content.cloneNode(true);
    document.body.append(errorTemplate);
  }
});

cancelButton.addEventListener('click', resetForm);

submitButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  const newPhoto = createPhoto({
    url: previewImg.src,
    description: descriptionInput.value,
    hashtags: document.querySelector('.text__hashtags').value,
    likes: 0,
    comments: [],
    effect: currentEffect,
    scale: currentScale
  });

  photos.push(newPhoto);
  renderThumbnails([newPhoto]);

  resetForm();
});
