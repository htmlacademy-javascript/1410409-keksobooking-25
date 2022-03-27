import {adForm} from './form.js';

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

const createPristineInstance = () => new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span', errorTextClass: 'ad-form__error'
});

//Проверка заголовка на пробелы
const checkTitleSpaces = (value) => value.trim() !== '';

//зависимость поля "Цена за ночь" от типа жилья
const onSelectPriceChange = () => {
  price.min = minPrices[type.value];
  price.placeholder = minPrices[type.value];
};

//Проверка минимальной цены
const validatePrice = (element) => element >= price.min;
const getErrorMessagePrice = () => `Цена не может быть ниже ${price.min}р`;

//проверка соответствия полей количество комнат и количество мест
const validateCapacity = (element) => roomsOption[rooms.value].includes(element);
const validateRooms = (element) => roomsOption[element].includes(capacity.value);

//синхронизация времени заезда и выезда
const onSelectTimeinChange = () => {
  timeout.value = timein.value;
};
const onSelectTimeoutChange = () => {
  timein.value = timeout.value;
};

//Общая проверка формы
const onFormSubmit = (evt, pristine) => {
  evt.preventDefault();
  pristine.validate();
};
const onFormChange = (pristine) => {
  pristine.validate();
};

const addValidators = (pristine) => {
  pristine.addValidator(title, checkTitleSpaces, 'Заголовок не может состоять только из пробелов');
  pristine.addValidator(rooms, validateRooms, 'Количество комнат не соответствует выбранному количеству гостей');
  pristine.addValidator(capacity, validateCapacity, 'Количество гостей не соответствует выбранному количеству комнат');
  pristine.addValidator(price, validatePrice, getErrorMessagePrice);
};

const initValidation = () => {
  const pristine = createPristineInstance();
  addValidators(pristine);

  timein.addEventListener('change', onSelectTimeinChange);
  timeout.addEventListener('change', onSelectTimeoutChange);
  type.addEventListener('change', onSelectPriceChange);

  adForm.addEventListener('submit', (evt) => onFormSubmit(evt, pristine));
  //adForm.addEventListener('change', () => onFormChange(pristine));
};

export {initValidation};
