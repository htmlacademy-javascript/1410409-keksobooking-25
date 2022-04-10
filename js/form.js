import {resetMap} from './map.js';
import {renderFilteredMarkers} from './map-filters.js';

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

const setFormResetListener = (cb) => {
  adForm.addEventListener('reset', () => {
    cb();
  });
};

const resetForm = (markers, maxMarkersAmount) => {
  adForm.reset();
  mapFilters.reset();
  resetMap();
  setFormResetListener(() => renderFilteredMarkers(markers, maxMarkersAmount));
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

export {deactivateForm, activateForm, resetForm, toggleAttributeDisabled};
