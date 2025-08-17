import { MESSAGES, USER_NAMES, SETTINGS, PHOTO_DESCRIPTIONS } from '../data/const.js';

// вспомогательные функции

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(arr) {
  return arr[getRandomInt(0, arr.length - 1)];
}

// уникальные id
const usedPhotoIds = new Set();
const usedCommentIds = new Set();

function getUniquePhotoId() {
  let id;
  do {
    id = getRandomInt(SETTINGS.photoIdRange[0], SETTINGS.photoIdRange[1]);
  } while (usedPhotoIds.has(id));
  usedPhotoIds.add(id);
  return id;
}

function getUniqueCommentId() {
  let id;
  do {
    id = getRandomInt(SETTINGS.commentIdRange[0], SETTINGS.commentIdRange[1]);
  } while (usedCommentIds.has(id));
  usedCommentIds.add(id);
  return id;
}

export { getUniquePhotoId, getUniqueCommentId, getRandomInt, getRandomElement };
