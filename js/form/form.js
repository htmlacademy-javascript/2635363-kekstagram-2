import { MAX_HASHTAGS, HASHTAG_REGEX, MAX_COMMENT_LENGTH } from '../data/const.js';
import { resetEffects } from './effects.js';
import { resetScale } from './scale.js';
import { sendData } from '../api.js';
import { showMessage } from '../utils/messages.js';


const form = document.querySelector('.img-upload__form');
const uploadInput = form.querySelector('.img-upload__input');
const overlay = form.querySelector('.img-upload__overlay');
const cancelButton = form.querySelector('.img-upload__cancel');
const hashTagsInput = form.querySelector('.text__hashtags');
const descriptionInput = form.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

function validateHashtag(tag) {
  return HASHTAG_REGEX.test(tag);
}

function validateHashtags(value) {
  if (!value) {
    return true;
  }
  const tags = value.toLowerCase().trim().split(/\s+/);
  if (tags.length > MAX_HASHTAGS) {
    return false;
  }
  const uniqueTags = new Set(tags);
  if (uniqueTags.size !== tags.length) {
    return false;
  }
  return tags.every(validateHashtag);
}
pristine.addValidator(hashTagsInput, validateHashtags, 'Неправильные хэштеги');

function validateComment(value) {
  return value.length <= MAX_COMMENT_LENGTH;
}

pristine.addValidator(descriptionInput, validateComment, 'Комментарий не должен превышать 140 символов');

function onEscKeyDown(evt) {
  if (evt.key === 'Escape' &&
    document.activeElement !== hashTagsInput &&
    document.activeElement !== descriptionInput &&
    !document.querySelector('.error__inner')
  ) {
    closeForm();
  }
}

function onUploadInputChange() {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyDown);
}

uploadInput.addEventListener('change', onUploadInputChange);

function closeForm() {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  form.reset();
  pristine.reset();
  resetEffects();
  resetScale();

  document.removeEventListener('keydown', onEscKeyDown);
}

function onCancelButtonClick() {
  closeForm();
}

cancelButton.addEventListener('click', onCancelButtonClick);

async function onFormSubmit(evt) {
  evt.preventDefault();
  const valid = pristine.validate();
  if (!valid) {
    return;
  }

  const formData = new FormData(form);

  try {
    await sendData(formData);
    closeForm();
    showMessage('success');
  } catch (err) {
    showMessage('error');
  }
}

form.addEventListener('submit', onFormSubmit);
