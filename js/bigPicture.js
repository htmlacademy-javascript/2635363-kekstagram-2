import { createComment } from './createComment.js';
import { COMMENTS_PER_PAGE } from './data/const.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const body = document.querySelector('body');

const imgElement = bigPicture.querySelector('.big-picture__img img');
const likesElement = bigPicture.querySelector('.likes-count');
const commentsShownElement = bigPicture.querySelector('.social__comment-shown-count');
const commentsTotalElement = bigPicture.querySelector('.social__comment-total-count');
const commentsElement = bigPicture.querySelector('.social__comments');

const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const loadMoreButton = bigPicture.querySelector('.comments-loader');

let commentsData = [];
let shownCount = 0;

function renderNextComments() {
  const nextComments = commentsData.slice(shownCount, shownCount + COMMENTS_PER_PAGE);

  nextComments.forEach(appendComment);

  shownCount += nextComments.length;

  if (shownCount >= commentsData.length) {
    loadMoreButton.classList.add('hidden');
  } else {
    loadMoreButton.classList.remove('hidden');
  }

  commentsShownElement.textContent = shownCount;
}

function appendComment(comment) {
  commentsElement.appendChild(createComment(comment));
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
  bigPictureCancel.removeEventListener('click', onBigPictureCancelClick);
  loadMoreButton.removeEventListener('click', onLoadMoreButtonClick);
}

function onBigPictureCancelClick() {
  closeBigPicture();
}

function onEscKeyDown(evt) {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
}

function onLoadMoreButtonClick() {
  renderNextComments();
}

function showBigPicture({ url, likes, comments, description }) {
  imgElement.src = url;
  imgElement.alt = description;

  likesElement.textContent = likes;
  commentsTotalElement.textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  commentsData = comments;
  shownCount = 0;
  commentsElement.innerHTML = '';

  renderNextComments();

  if (commentsData.length <= COMMENTS_PER_PAGE) {
    loadMoreButton.classList.add('hidden');
  }

  commentCountBlock.classList.remove('hidden');

  loadMoreButton.removeEventListener('click', onLoadMoreButtonClick);
  loadMoreButton.addEventListener('click', onLoadMoreButtonClick);
  document.addEventListener('keydown', onEscKeyDown);
  bigPictureCancel.addEventListener('click', onBigPictureCancelClick);
}

export { showBigPicture };
