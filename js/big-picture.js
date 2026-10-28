import { isEscapeKey } from './util.js';

const AVATAR_SIZE = 35;
const COMMENTS_STEP = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsList = bigPicture.querySelector('.social__comments');
const caption = bigPicture.querySelector('.social__caption');
const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

let currentComments = [];
let shownCommentsCount = 0;

const createComment = ({ avatar, name, message }) => {
  const comment = document.createElement('li');
  comment.classList.add('social__comment');

  const picture = document.createElement('img');
  picture.classList.add('social__picture');
  picture.src = avatar;
  picture.alt = name;
  picture.width = AVATAR_SIZE;
  picture.height = AVATAR_SIZE;

  const text = document.createElement('p');
  text.classList.add('social__text');
  text.textContent = message;

  comment.append(picture, text);

  return comment;
};

const renderCommentsCount = () => {
  commentCountBlock.innerHTML = `${shownCommentsCount} из <span class="comments-count">${currentComments.length}</span> комментариев`;
};

const renderNextComments = () => {
  const nextComments = currentComments.slice(shownCommentsCount, shownCommentsCount + COMMENTS_STEP);
  const fragment = document.createDocumentFragment();

  nextComments.forEach((comment) => {
    fragment.append(createComment(comment));
  });

  commentsList.append(fragment);
  shownCommentsCount += nextComments.length;

  renderCommentsCount();
  commentsLoader.classList.toggle('hidden', shownCommentsCount >= currentComments.length);
};

const fillBigPicture = ({ url, description, likes, comments }) => {
  bigPictureImage.src = url;
  bigPictureImage.alt = description;
  likesCount.textContent = likes;
  caption.textContent = description;

  currentComments = comments;
  shownCommentsCount = 0;
  commentsList.innerHTML = '';
  renderNextComments();
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const onCloseButtonClick = () => {
  closeBigPicture();
};

const onCommentsLoaderClick = () => {
  renderNextComments();
};

function openBigPicture(photo) {
  fillBigPicture(photo);

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
}

closeButton.addEventListener('click', onCloseButtonClick);
commentsLoader.addEventListener('click', onCommentsLoaderClick);

export { openBigPicture };
