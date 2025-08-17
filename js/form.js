import { MAX_HASHTAGS, HASHTAG_REGEX, MAX_COMMENT_LENGTH } from './data/const.js';

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

function validateHashtags(value) {
  if (!value) return true;
  const tags = value.toLowerCase().trim().split(/\s+/);
  if (tags.length > MAX_HASHTAGS) return false;
  const uniqueTags = new Set(tags);
  if (uniqueTags.size !== tags.length) return false;
  return tags.every((tag) => HASHTAG_REGEX.test(tag));
}

pristine.addValidator(hashTagsInput, validateHashtags, 'Неправильные хэштеги');

function validateComment(value) {
  return value.length <= MAX_COMMENT_LENGTH;
}

pristine.addValidator(descriptionInput, validateComment, 'Комментарий не должен превышать 140 символов');

uploadInput.addEventListener('change', () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
});

function closeForm() {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  form.reset();
  pristine.reset();
}

cancelButton.addEventListener('click', closeForm);

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' && document.activeElement !== hashTagsInput && document.activeElement !== descriptionInput
  ) {
    closeForm();
  }
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const valid = pristine.validate();
  if (!valid) return;

  const formData = new FormData(form);
  fetch('https://31.javascript.htmlacademy.pro/kekstagram', {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        closeForm();
      } else {
        console.error('Ошибка при отправке формы');
      }
    })
    .catch((error) => {
      console.error('Ошибка сети при отправке формы', error);
    });
})
