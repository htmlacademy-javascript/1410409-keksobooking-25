import {price} from './elements.js';

const PRICE_MAX = 100000;
const PRICE_MIN = 0;
const PRICE_DEFAULT = 1000;

const slider = document.querySelector('.ad-form__slider');

noUiSlider.create(slider, {
  range: {
    min: Number(PRICE_MIN),
    max: Number(PRICE_MAX),
  },
  start: 1000,
  format: {
    to: (value) => value.toFixed(0),
    from: (value) => parseFloat(value),
  },
});

const setSlider = (cb) => {
  slider.noUiSlider.on('update', () => {
    price.value = slider.noUiSlider.get();
    cb();
  });
};

const resetSlider = () => {
  slider.noUiSlider.set(PRICE_DEFAULT);
  price.value = PRICE_DEFAULT;
  price.min = PRICE_DEFAULT;
};

export {setSlider, resetSlider};
