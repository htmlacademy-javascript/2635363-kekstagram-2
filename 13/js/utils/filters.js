import { renderThumbnails, clearThumbnails } from "../render-thumbnails.js";
import { debounce } from "./debounce.js";
import { RANDOM_PHOTOS_COUNT } from "../data/const.js";
import { photos } from "../data/data.js";


function getRandomPhotos() {
  return [...photos]
    .sort(() => Math.random() - 0.5)
    .slice(0, RANDOM_PHOTOS_COUNT);
}

function getDiscussedPhotos() {
  return [...photos].sort((a, b) => b.comments.length - a.comments.length);
}

function applyFilter(filterId) {
  clearThumbnails();

  let filteredPhotos = [];

  switch (filterId) {
    case 'filter-default':
      filteredPhotos = photos;
      break;
    case 'filter-random':
      filteredPhotos = getRandomPhotos();
      break;
    case 'filter-discussed':
      filteredPhotos = getDiscussedPhotos();
      break;
    default:
      filteredPhotos = photos;
  }

  renderThumbnails(filteredPhotos);
}

export function initFilters() {

  const filters = document.querySelector('.img-filters');
  filters.classList.remove('img-filters--inactive');

  const buttons = filters.querySelectorAll('.img-filters__button');
  const debouncedApplyFilter = debounce(applyFilter, 500);

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((btn) =>
        btn.classList.remove("img-filters__button--active")
      );
      button.classList.add("img-filters__button--active");

      debouncedApplyFilter(button.id);
    });
  });
}
