const MIN_SCALE = 25;
const MAX_SCALE = 100;
const SCALE_STEP = 25;

const preview = document.querySelector('.img-upload__preview img');
const scaleControl = document.querySelector('.img-upload__scale');
const scaleInput = scaleControl.querySelector('.scale__control--value');
const smallerButton = scaleControl.querySelector('.scale__control--smaller');
const biggerButton = scaleControl.querySelector('.scale__control--bigger');

const setScale = (value) => {
  const scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, value));
  scaleInput.value = `${scale}%`;
  preview.style.transform = `scale(${scale / MAX_SCALE})`;
};

const getScale = () => parseInt(scaleInput.value, 10);

const resetScale = () => setScale(MAX_SCALE);

smallerButton.addEventListener('click', () => setScale(getScale() - SCALE_STEP));
biggerButton.addEventListener('click', () => setScale(getScale() + SCALE_STEP));

resetScale();

export { resetScale };
