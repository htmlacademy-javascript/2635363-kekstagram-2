
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
    id = getRandomInt(1, 25);
  } while (usedPhotoIds.has(id));
  usedPhotoIds.add(id);
  return id;
}

function getUniqueCommentId() {
  let id;
  do {
    id = getRandomInt(1, 100);
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
};

function getComment() {
  return {
    id: getUniqueCommentId(),
    avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
    message: getRandomMessage(),
    name: getRandomElement(USER_NAMES),
  };
}

// фотографии
function getPhoto() {
  const id = getUniquePhotoId();
  const commentsCount = getRandomInt(0, 30);
  const comments = Array.from({ length: commentsCount }, getComment);

  return {
    id,
    url: `photos/${id}.jpg`,
    description: getRandomElement(PHOTO_DESCRIPTIONS),
    likes: getRandomInt(15, 200),
    comments
  };
}

function getPhotos() {
  const photos = [];
  for (let i = 0; i < 25; i++) {
    photos.push(getPhoto());
  }
  return photos;
}
getPhotos();
