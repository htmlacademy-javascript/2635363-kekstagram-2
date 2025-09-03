import { renderThumbnails, clearThumbnails } from '../render-thumbnails.js';
import { debounce } from './debounce.js';
import { RANDOM_PHOTOS_COUNT } from '../data/const.js';

function getRandomPhotos(pictures) {
  return [...pictures]
    .sort(() => Math.random() - 0.5)
    .slice(0, RANDOM_PHOTOS_COUNT);
}

function getDiscussedPhotos(pictures) {
  return [...pictures].sort((a, b) => b.comments.length - a.comments.length);
}

function applyFilter(filterId, pictures) {
  clearThumbnails();

  let filteredPhotos = [];

  switch (filterId) {
    case 'filter-default':
      filteredPhotos = pictures;
      break;
    case 'filter-random':
      filteredPhotos = getRandomPhotos(pictures);
      break;
    case 'filter-discussed':
      filteredPhotos = getDiscussedPhotos(pictures);
      break;
    default:
      filteredPhotos = pictures;
  }

  renderThumbnails(filteredPhotos);
}

export function initFilters(pictures) {
  const filters = document.querySelector('.img-filters');
  filters.classList.remove('img-filters--inactive');

  const buttons = filters.querySelectorAll('.img-filters__button');
  const debouncedApplyFilter = debounce(
    (filterId) => applyFilter(filterId, pictures),
    500
  );

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach((btn) =>
        btn.classList.remove('img-filters__button--active')
      );
      button.classList.add('img-filters__button--active');

      debouncedApplyFilter(button.id);
    });
  });
}
