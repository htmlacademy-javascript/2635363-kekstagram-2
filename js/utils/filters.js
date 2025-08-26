import { renderThumbnails, clearThumbnails } from "../render-thumbnails.js";
import { debounce } from "./debounce.js";
import { RANDOM_PHOTOS_COUNT } from "../data/const.js";

let photos = [];

function setPhotos(data) {
  photos = data || [];
}

function getRandomPhotos() {
  if (!photos.length) return [];
  return [...photos]
    .sort(() => Math.random() - 0.5)
    .slice(0, RANDOM_PHOTOS_COUNT);
}

function getDiscussedPhotos() {
  if (!photos.length) return [];
  return [...photos].sort((a, b) => b.comments.length - a.comments.length);
}

function applyFilter(filterId) {
  console.log("Фильтр выбран:", filterId);       // какой фильтр нажали
  console.log("Сколько фото всего:", photos.length);
  clearThumbnails();

  let filteredPhotos = [];

  switch (filterId) {
    case 'filter-default':
      console.log("Рисуем дефолт", photos.length);
      filteredPhotos(photos);
      break;
    case 'filter-random':
      console.log("Рисуем рандом", photos.length);
      filteredPhotos = getRandomPhotos(photos);
      break;
    case 'filter-discussed':
      console.log("Рисуем обсуждаемые", photos.length);
      filteredPhotos = getDiscussedPhotos(photos);
      break;
    default:
      filteredPhotos = photos;
  }

  renderThumbnails(filteredPhotos);
}

export function initFilters(data) {
  setPhotos(data);

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
