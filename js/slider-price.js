const slider = document.querySelector('.ad-form__slider');
const inputPrice = document.querySelector('#price');
const PRICE_MAX = 100000;
const PRICE_MIN = 0;

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

export {setSlider};
