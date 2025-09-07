import { renderThumbnails, clearThumbnails } from '../render-thumbnails.js';
import { debounce } from './debounce.js';
import { RANDOM_PHOTOS_COUNT } from '../data/const.js';

function getRandomPhotos(pictures) {
  function getRandomSort() {
    return Math.random() - 0.5;
  }
  return [...pictures]
    .sort(getRandomSort)
    .slice(0, RANDOM_PHOTOS_COUNT);
}

function getDiscussedPhotos(pictures) {
  function compareComments(a, b) {
    return b.comments.length - a.comments.length;
  }
  return [...pictures].sort(compareComments);
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

  function handleFilterChange(filterId) {
    applyFilter(filterId, pictures);
  }

  const debouncedApplyFilter = debounce(
    handleFilterChange, 500
  );

  buttons.forEach(addButtonClickHandler);

  function addButtonClickHandler(button) {
    button.addEventListener('click', onFilterButtonClick.bind(null, button));
  }

  function onFilterButtonClick(button) {
    removeActiveClasses();

    button.classList.add('img-filters__button--active');

    debouncedApplyFilter(button.id);
  }

  function removeActiveClasses() {
    buttons.forEach(removeActiveClass);
  }

  function removeActiveClass(button) {
    button.classList.remove('img-filters__button--active');
  }
}
