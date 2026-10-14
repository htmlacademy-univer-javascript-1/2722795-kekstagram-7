const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createThumbnail = ({ url, description, likes, comments }) => {
  const thumbnail = pictureTemplate.cloneNode(true);
  const image = thumbnail.querySelector('.picture__img');

  image.src = url;
  image.alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;

  return thumbnail;
};

const renderThumbnails = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    fragment.append(createThumbnail(photo));
  });

  picturesContainer.append(fragment);
};

export { renderThumbnails };
