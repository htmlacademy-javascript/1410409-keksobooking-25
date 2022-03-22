const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

const pristine = new Pristine(adForm);

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
});

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

  mapFilters.classList.remove('map__filters--disabled');
  toggleAttributeDisabled(mapFilters.children, false);
};

export {deactivateForm, activateForm};
