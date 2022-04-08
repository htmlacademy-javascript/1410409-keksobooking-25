import {resetMap} from './map.js';


const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const resetButton = adForm.querySelector('.ad-form__reset');

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

const activateFilters = () => {
  mapFilters.classList.remove('map__filters--disabled');
  toggleAttributeDisabled(mapFilters.children, false);
};

const resetForm = () => {
  adForm.reset();
  mapFilters.reset();
  resetMap();
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

export {deactivateForm, activateForm, activateFilters, resetForm};
