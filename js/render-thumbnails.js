import { showBigPicture } from './bigPicture.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

function renderThumbnails(pictures) {
  const fragment = document.createDocumentFragment();

  pictures.forEach(renderSingleThumbnail);

  picturesContainer.appendChild(fragment);

  function renderSingleThumbnail(picture) {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__img').alt = picture.description;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;

    pictureElement.addEventListener('click', onThumbnailClick.bind(null, picture));

    fragment.appendChild(pictureElement);
  }

  function onThumbnailClick(picture) {
    showBigPicture(picture);
  }
}

function clearThumbnails() {
  const thumbnails = picturesContainer.querySelectorAll('.picture');
  thumbnails.forEach(removeThumbnail);
}

function removeThumbnail(thumbnail) {
  thumbnail.remove();
}

export { renderThumbnails, clearThumbnails };
