// для генерации
const SETTINGS = {
  photoCount: 25,
  photoIdRange: [1, 25],
  commentCountRange: [0, 30],
  commentIdRange: [1, 750],
  likesRange: [15, 200],
  avatarCount: 6,
};

const COMMENTS_PER_PAGE = 5;

// для хэштэгов
const MAX_HASHTAGS = 5;
const HASHTAG_REGEX = /^#[A-Za-z0-9]{1,19}$/;
const MAX_COMMENT_LENGTH = 140;

// для масштаба
const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_DEFAULT = 100;

// для эффектов
const EFFECTS = {
  none: {
    filter: '',
    options: { range: { min: 0, max: 1 }, start: 1, step: 0.1 }
  },
  chrome: {
    filter: 'grayscale',
    options: { range: { min: 0, max: 1 }, start: 1, step: 0.1 }
  },
  sepia: {
    filter: 'sepia',
    options: { range: { min: 0, max: 1 }, start: 1, step: 0.1 }
  },
  marvin: {
    filter: 'invert',
    options: { range: { min: 0, max: 100 }, start: 100, step: 1 },
    unit: '%'
  },
  phobos: {
    filter: 'blur',
    options: { range: { min: 0, max: 3 }, start: 3, step: 0.1 },
    unit: 'px'
  },
  heat: {
    filter: 'brightness',
    options: { range: { min: 1, max: 3 }, start: 3, step: 0.1 }
  }
};

// для работы с сервером
const SERVER_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const SERVER_DATA_URL = `${SERVER_URL}/data`;

const RANDOM_PHOTOS_COUNT = 10;

const FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif'];

export { SETTINGS, COMMENTS_PER_PAGE, MAX_HASHTAGS, HASHTAG_REGEX, MAX_COMMENT_LENGTH, SCALE_STEP, SCALE_MIN, SCALE_MAX, SCALE_DEFAULT, EFFECTS, SERVER_URL, SERVER_DATA_URL, RANDOM_PHOTOS_COUNT, FILE_TYPES };
