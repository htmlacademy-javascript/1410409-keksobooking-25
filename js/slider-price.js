const slider = document.querySelector('.ad-form__slider');
const inputPrice = document.querySelector('#price');
const priceMax = inputPrice.max;
const priceMin = inputPrice.min;

noUiSlider.create(slider, {
  range: {
    min: Number(priceMin),
    max: Number(priceMax),
  },
  start: priceMin,
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
