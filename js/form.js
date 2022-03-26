const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const title = adForm.querySelector('#title');
const rooms = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const price = adForm.querySelector('#price');
const type = adForm.querySelector('#type');
const timein = adForm.querySelector('#timein');
const timeout = adForm.querySelector('#timeout');

const roomsOption = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

const minPrices = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error'
});

function checkTitleSpaces (value) {
  return value.trim() !== '';
}

function validateCapacity (element) {
  return roomsOption[rooms.value].includes(element);
}

function validatePrice (element) {
  console.log(price.min);
  return element >= price.min;
}

pristine.addValidator(title, checkTitleSpaces, 'Заголовок не может состоять только из пробелов');

pristine.addValidator(capacity, validateCapacity, 'Количество гостей не соответствует выбранному количеству комнат');

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

adForm.addEventListener('change', () => {
  pristine.validate();
});

document.addEventListener('DOMContentLoaded', () => {
  pristine.validate();
});

//зависимость поля "Цена за ночь" от типа жилья
type.addEventListener('change', () => {
  price.min = minPrices[type.value];
  price.placeholder = minPrices[type.value];
});

pristine.addValidator(price, validatePrice, `Цена не может быть ниже ${price.min}р`);

//Синхронизация времени заезда и выезда
timein.addEventListener('change', () => {
  timeout.value = timein.value;
});
timeout.addEventListener('change', () => {
  timein.value = timeout.value;
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
