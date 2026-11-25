import { isEscapeKey } from './util.js';

const DATA_ERROR_TIMEOUT = 5000;

const showDataError = () => {
  const message = document.createElement('div');
  message.classList.add('data-error');
  message.setAttribute('role', 'alert');
  message.textContent = 'Не удалось загрузить фотографии';

  document.body.append(message);
  setTimeout(() => message.remove(), DATA_ERROR_TIMEOUT);
};

const showUploadMessage = (type) => {
  const template = document.querySelector(`#${type}`);
  const message = template.content.firstElementChild.cloneNode(true);
  const closeButton = message.querySelector(`.${type}__button`);
  const previousFocus = document.activeElement;

  const closeMessage = () => {
    message.remove();
    document.removeEventListener('keydown', onDocumentKeydown, true);
    previousFocus.focus();
  };

  function onDocumentKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      evt.stopPropagation();
      closeMessage();
    }
  }

  closeButton.addEventListener('click', closeMessage);
  message.addEventListener('click', (evt) => {
    if (evt.target === message) {
      closeMessage();
    }
  });

  document.body.append(message);
  document.addEventListener('keydown', onDocumentKeydown, true);
  closeButton.focus();
};

export { showDataError, showUploadMessage };
