const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const body = document.querySelector('body');

const imgElement = bigPicture.querySelector('.big-picture__img img');
const likesElement = bigPicture.querySelector('.likes-count');
const commentsShownElement = bigPicture.querySelector('.social__comment-shown-count');
const commentsTotalElement = bigPicture.querySelector('.social__comment-total-count');
const commentsElement = bigPicture.querySelector('.social__comments');

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
  bigPictureCancel.removeEventListener('click', closeBigPicture);
}

function onEscKeyDown(evt) {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
}

function renderComments(comments) {
  commentsElement.innerHTML = '';
  comments.forEach(({ avatar, name, message }) => {
    const li = document.createElement('li');
    li.classList.add('social__comment');

    const img = document.createElement('img');
    img.classList.add('social__picture');
    img.src = avatar;
    img.alt = name;
    img.width = 35;
    img.height = 35;

    const p = document.createElement('p');
    p.classList.add('social__text');
    p.textContent = message;

    li.appendChild(img);
    li.appendChild(p);
    commentsElement.appendChild(li);

  });
}

function showBigPicture(photo) {
  imgElement.src = photo.url;
  imgElement.alt = photo.description;

  likesElement.textContent = photo.likes;
  commentsShownElement.textContent = photo.comments.length;
  commentsTotalElement.textContent = photo.comments.length;

  bigPicture.querySelector('.social__caption').textContent = photo.description;

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  renderComments(photo.comments);

  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');

  document.addEventListener('keydown', onEscKeyDown);
  bigPictureCancel.addEventListener('click', closeBigPicture);
}

export { showBigPicture };
