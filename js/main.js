import { getData } from './api.js';
import { showDataError } from './messages.js';
import { renderThumbnails } from './thumbnails.js';
import './form.js';

getData()
  .then(renderThumbnails)
  .catch(showDataError);
