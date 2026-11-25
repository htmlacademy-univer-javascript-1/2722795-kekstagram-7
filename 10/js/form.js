import { isEscapeKey } from './util.js';
import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';

const MAX_HASHTAGS_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;
const HASHTAG_REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;

const ErrorText = {
  HASHTAG_FORMAT: 'Хэш-тег начинается с #, состоит из букв и цифр и содержит не более 20 символов',
  HASHTAG_COUNT: `Не более ${MAX_HASHTAGS_COUNT} хэш-тегов`,
  HASHTAG_UNIQUE: 'Хэш-теги не должны повторяться',
  COMMENT_LENGTH: `Не более ${MAX_COMMENT_LENGTH} символов`,
};

const form = document.querySelector('.img-upload__form');
const fileInput = form.querySelector('.img-upload__input');
const overlay = form.querySelector('.img-upload__overlay');
const cancelButton = form.querySelector('.img-upload__cancel');
const hashtagsInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error',
});

const parseHashtags = (value) => value.trim().split(/\s+/).filter(Boolean);

const isHashtagsFormatValid = (value) =>
  parseHashtags(value).every((hashtag) => HASHTAG_REGEXP.test(hashtag));

const isHashtagsCountValid = (value) =>
  parseHashtags(value).length <= MAX_HASHTAGS_COUNT;

const isHashtagsUnique = (value) => {
  const hashtags = parseHashtags(value).map((hashtag) => hashtag.toLowerCase());
  return new Set(hashtags).size === hashtags.length;
};

const isCommentValid = (value) => value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(hashtagsInput, isHashtagsFormatValid, ErrorText.HASHTAG_FORMAT, 3, true);
pristine.addValidator(hashtagsInput, isHashtagsCountValid, ErrorText.HASHTAG_COUNT, 2, true);
pristine.addValidator(hashtagsInput, isHashtagsUnique, ErrorText.HASHTAG_UNIQUE, 1, true);
pristine.addValidator(commentInput, isCommentValid, ErrorText.COMMENT_LENGTH);

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadForm();
  }
};

const onTextFieldKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const onFileInputChange = () => {
  if (fileInput.value) {
    openUploadForm();
  }
};

const onCancelButtonClick = (evt) => {
  evt.preventDefault();
  closeUploadForm();
};

const onFormSubmit = (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
};

function openUploadForm() {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
}

function closeUploadForm() {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);

  form.reset();
  fileInput.value = '';
  resetScale();
  resetEffects();
  pristine.reset();
}

fileInput.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);
form.addEventListener('submit', onFormSubmit);
hashtagsInput.addEventListener('keydown', onTextFieldKeydown);
commentInput.addEventListener('keydown', onTextFieldKeydown);
