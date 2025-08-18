
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const USER_NAMES = [
  'Иван Петров',
  'Василий Смирнов',
  'Пётр Сидоров',
  'Мария Иванова',
  'Михаил Кузнецов',
  'Анастасия Орлова',
  'Екатерина Фёдорова',
  'Дарья Морозова',
  'Николай Волков',
  'Александр Соловьёв',
  'Дмитрий Егоров',
  'Ольга Лебедева',
  'Анна Крылова',
  'Ирина Новикова',
  'Юлия Павлова',
  'Тимофей Алексеев',
  'Артём Захаров',
  'Кирилл Воробьёв',
  'Сергей Беляев',
  'Татьяна Комарова'
];


const PHOTO_DESCRIPTIONS = [
  'Закат на берегу моря',
  'Котик на подоконнике',
  'Вид из окна поезда',
  'Утренний кофе и газета',
  'Прогулка по осеннему парку',
  'Горы в облаках',
  'Селфи на крыше',
  'Ночной город',
  'Домашний уют',
  'Солнце сквозь листья',
  'Старая улица в центре города',
  'Чашка чая и книга',
  'Снежная тропинка в лесу',
  'Мост над рекой',
  'Огоньки на новогодней ёлке',
  'Песчаный пляж и волны',
  'Заброшенный дом с граффити',
  'Фейерверк в ночном небе',
  'Полевые цветы летом',
  'Детская площадка во дворе',
  'Граффити на стене',
  'Рассвет в горах',
  'Город в тумане',
  'Лодки на озере',
  'Тропинка в саду после дождя'
];

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

export { MESSAGES, USER_NAMES, PHOTO_DESCRIPTIONS, SETTINGS, COMMENTS_PER_PAGE, MAX_HASHTAGS, HASHTAG_REGEX, MAX_COMMENT_LENGTH, SCALE_STEP, SCALE_MIN, SCALE_MAX, SCALE_DEFAULT, EFFECTS };
