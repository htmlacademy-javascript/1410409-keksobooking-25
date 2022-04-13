import {resetMap} from './map.js';
import {resetSlider} from './slider-price.js';
import {adForm, mapFilters, resetButton} from './elements.js';

const toggleAttributeDisabled = (collection, state) => {
  Array.from(collection).forEach((element) => {
    element.disabled = state;
  });
};

const deactivateForm = () => {
  adForm.classList.add('ad-form--disabled');
  toggleAttributeDisabled(adForm.children, true);

  mapFilters.classList.add('map__filters--disabled');
  toggleAttributeDisabled(mapFilters.children, true);
};

const activateForm = () => {
  adForm.classList.remove('ad-form--disabled');
  toggleAttributeDisabled(adForm.children, false);
};

const resetForm = () => {
  adForm.reset();
  resetSlider();
  mapFilters.reset();
  resetMap();
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

export {deactivateForm, activateForm, resetForm, toggleAttributeDisabled};
