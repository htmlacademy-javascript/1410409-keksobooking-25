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
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

slider.noUiSlider.on('update', () => {
  inputPrice.value = slider.noUiSlider.get();
});
