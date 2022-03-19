const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

const toggleAttributeDisabled = (collection) => {
  Array.from(collection).forEach((element) => {
    if (element.disabled) {
      element.disabled = false;
    } else {
      element.disabled = true;
    }
  });
};

const deactivateForm = () => {
  adForm.classList.add('ad-form--disabled');
  toggleAttributeDisabled(adForm.children);

  mapFilters.classList.add('map__filters--disabled');
  toggleAttributeDisabled(mapFilters.children);
};

const activateForm = () => {
  adForm.classList.remove('ad-form--disabled');
  toggleAttributeDisabled(adForm.children);

  mapFilters.classList.remove('map__filters--disabled');
  toggleAttributeDisabled(mapFilters.children);
};

export {deactivateForm, activateForm};
