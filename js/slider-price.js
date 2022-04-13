const PRICE_MAX = 100000;
const PRICE_MIN = 0;
const PRICE_DEFAULT = 1000;

const slider = document.querySelector('.ad-form__slider');
const inputPrice = document.querySelector('#price');

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
    inputPrice.value = slider.noUiSlider.get();
    cb();
  });
};

const resetSlider = () => {
  slider.noUiSlider.set(PRICE_DEFAULT);
  inputPrice.value = slider.noUiSlider.get();
};

export {setSlider, resetSlider};
