import { SETTINGS } from '../data/const.js';

// вспомогательные функции
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(arr) {
  return arr[getRandomInt(0, arr.length - 1)];
}

// уникальные id

function getUniqueId(range, usedIds) {
  let id;
  do {
    id = getRandomInt(range[0], range[1]);
  } while (usedIds.has(id));
  usedIds.add(id);
  return id;
}

const usedPhotoIds = new Set();

function getUniqueIdPhotoId() {
  return getUniqueId(SETTINGS.photoIdRange, usedPhotoIds);
}

export { getUniqueIdPhotoId, getRandomInt, getRandomElement };
