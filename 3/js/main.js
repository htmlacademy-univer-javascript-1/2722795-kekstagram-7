const PHOTOS_COUNT = 25;

const Likes = {
  MIN: 15,
  MAX: 200,
};

const Comments = {
  MIN: 0,
  MAX: 30,
};

const AvatarIndex = {
  MIN: 1,
  MAX: 6,
};

const DESCRIPTIONS = [
  'Закат на набережной',
  'Утренний кофе перед парами',
  'Прогулка по осеннему парку',
  'Вид из окна поезда',
  'Кот, который не хотел фотографироваться',
  'Горы в тумане',
  'Ночной город после дождя',
  'Первый снег этой зимы',
  'Домашняя пицца собственного приготовления',
  'Старый трамвай на конечной',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Артём',
  'Мария',
  'Иван',
  'Софья',
  'Дмитрий',
  'Анна',
  'Никита',
  'Екатерина',
  'Алексей',
  'Полина',
];

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
};

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

const createIdGenerator = () => {
  let lastId = 0;
  return () => {
    lastId += 1;
    return lastId;
  };
};

const generateCommentId = createIdGenerator();

const createMessage = () => {
  const firstSentence = getRandomArrayElement(MESSAGES);

  if (getRandomInteger(0, 1) === 0) {
    return firstSentence;
  }

  let secondSentence = getRandomArrayElement(MESSAGES);
  while (secondSentence === firstSentence) {
    secondSentence = getRandomArrayElement(MESSAGES);
  }

  return `${firstSentence} ${secondSentence}`;
};

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(AvatarIndex.MIN, AvatarIndex.MAX)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

const createPhoto = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(Likes.MIN, Likes.MAX),
  comments: Array.from(
    { length: getRandomInteger(Comments.MIN, Comments.MAX) },
    createComment
  ),
});

const createPhotos = () =>
  Array.from({ length: PHOTOS_COUNT }, (_, index) => createPhoto(index + 1));

createPhotos();
