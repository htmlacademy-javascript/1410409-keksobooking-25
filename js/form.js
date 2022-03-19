const deactivateForm = () => {
  const adForm = document.querySelector('.ad-form');
  const mapFilters = document.querySelector('.map__filters');

  adForm.classList.add('ad-form--disabled');
  Array.from(adForm.children).forEach((element) => {
    element.disabled = true;
  });

  mapFilters.classList.add('map__filters--disabled');
  Array.from(mapFilters.children).forEach((element) => {
    element.disabled = true;
  });
};

const activateForm = () => {
  const adForm = document.querySelector('.ad-form');
  const mapFilters = document.querySelector('.map__filters');

  adForm.classList.remove('ad-form--disabled');
  Array.from(adForm.children).forEach((element) => {
    element.disabled = false;
  });

  mapFilters.classList.remove('map__filters--disabled');
  Array.from(mapFilters.children).forEach((element) => {
    element.disabled = false;
  });
};

export {deactivateForm, activateForm};
