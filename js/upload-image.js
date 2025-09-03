import { EFFECTS, FILE_TYPES } from './data/const.js';

const fileInput = document.querySelector('#upload-file');
const overlay = document.querySelector('.img-upload__overlay');
const previewImg = document.querySelector('.img-upload__preview img');
const cancelButton = document.querySelector('#upload-cancel');
const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');
const effectPreview = document.querySelectorAll('.effects__preview');

let currentEffect = 'none';

applyEffect();

function applyEffect() {
  const effectData = EFFECTS[currentEffect];
  const sliderFieldset = document.querySelector('.img-upload__effect-level');
  const effectLevelInput = document.querySelector('.effect-level__value');

  if (!effectData || currentEffect === 'none') {
    sliderFieldset.classList.add('hidden');
    previewImg.style.filter = '';
    effectLevelInput.value = '0';
    return;
  }

  sliderFieldset.classList.remove('hidden');
  const value = effectData.options.start;
  const unit = effectData.unit || '';
  previewImg.style.filter = `${effectData.filter}(${value}${unit || ''})`;
  effectLevelInput.value = value.toFixed(1);
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
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
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
      for (let i = 0; i < effectPreview.length; i++) {
        effectPreview[i].style.backgroundImage = `url(${reader.result})`;
      }
    });

    reader.readAsDataURL(file);
  } else {
    const errorTemplate = document.querySelector('#error').content.cloneNode(true);
    document.body.append(errorTemplate);
  }
});

cancelButton.addEventListener('click', resetForm);

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' && !overlay.classList.contains('hidden') && !document.querySelector('.error__inner')) {
    resetForm();
  }
});
