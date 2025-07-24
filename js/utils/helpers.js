import { MESSAGES, USER_NAMES, SETTINGS, PHOTO_DESCRIPTIONS } from './settings.js';

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

// коментарии
function getRandomMessage() {
  const messageCount = getRandomInt(1, 2);
  if (messageCount === 1) {
    return getRandomElement(MESSAGES);
  } else {
    const first = getRandomElement(MESSAGES);
    let second;
    do {
      second = getRandomElement(MESSAGES);
    } while (second === first);
    return `${first} ${second}`;
  }
}

function getComment() {
  return {
    id: getUniqueCommentId(),
    avatar: `img/avatar-${getRandomInt(1, SETTINGS.avatarCount)}.svg`,
    message: getRandomMessage(),
    name: getRandomElement(USER_NAMES),
  };
}

// фотографии
function getPhoto() {
  const id = getUniquePhotoId();
  const commentsCount = getRandomInt(SETTINGS.commentCountRange[0], SETTINGS.commentCountRange[1]);
  const comments = Array.from({ length: commentsCount }, getComment);

  return {
    id,
    url: `photos/${id}.jpg`,
    description: getRandomElement(PHOTO_DESCRIPTIONS),
    likes: getRandomInt(SETTINGS.likesRange[0], SETTINGS.likesRange[1]),
    comments
  };
}

function getPhotos() {
  const photos = [];
  for (let i = 0; i < SETTINGS.photoCount; i++) {
    photos.push(getPhoto());
  }
  return photos;
}
getPhotos();

export { getPhotos, getPhoto, getComment, getUniquePhotoId, getUniqueCommentId, getRandomInt, getRandomElement, getRandomMessage };
