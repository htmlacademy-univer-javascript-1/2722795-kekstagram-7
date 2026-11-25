const DEFAULT_EFFECT = 'none';

const Effect = {
  chrome: { filter: 'grayscale', min: 0, max: 1, step: 0.1, unit: '' },
  sepia: { filter: 'sepia', min: 0, max: 1, step: 0.1, unit: '' },
  marvin: { filter: 'invert', min: 0, max: 100, step: 1, unit: '%' },
  phobos: { filter: 'blur', min: 0, max: 3, step: 0.1, unit: 'px' },
  heat: { filter: 'brightness', min: 1, max: 3, step: 0.1, unit: '' },
};

const preview = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects__list');
const effectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelInput = effectLevel.querySelector('.effect-level__value');
const slider = effectLevel.querySelector('.effect-level__slider');

let currentEffect = DEFAULT_EFFECT;

noUiSlider.create(slider, {
  range: { min: 0, max: 1 },
  start: 1,
  connect: 'lower',
});

const onSliderUpdate = (values, handle) => {
  if (currentEffect === DEFAULT_EFFECT) {
    return;
  }

  const value = Number(values[handle]);
  const { filter, unit } = Effect[currentEffect];

  preview.style.filter = `${filter}(${value}${unit})`;
  effectLevelInput.value = value;
};

const setEffect = (name) => {
  currentEffect = name;
  const isDefaultEffect = name === DEFAULT_EFFECT;
  effectLevel.classList.toggle('hidden', isDefaultEffect);

  if (isDefaultEffect) {
    preview.style.filter = '';
    effectLevelInput.value = '';
    return;
  }

  const { min, max, step } = Effect[name];

  slider.noUiSlider.updateOptions({
    range: { min, max },
    start: max,
    step,
  });
};

const onEffectsListChange = (evt) => {
  if (evt.target.matches('.effects__radio')) {
    setEffect(evt.target.value);
  }
};

const resetEffects = () => setEffect(DEFAULT_EFFECT);

slider.noUiSlider.on('update', onSliderUpdate);
effectsList.addEventListener('change', onEffectsListChange);

export { resetEffects };
