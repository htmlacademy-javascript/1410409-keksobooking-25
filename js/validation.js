import {setSlider} from './slider-price.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 100000;

const adForm = document.querySelector('.ad-form');
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
const checkTitle = (value) => value && value.trim() !== '' && value.length >= 30 && value.length <= 100;
const getTitleErrorMessage = () => `Длина заголовка нужна от ${MIN_TITLE_LENGTH} до ${MAX_TITLE_LENGTH} символов. Вы ввели ${title.value.length} символов`;

//зависимость поля "Цена за ночь" от типа жилья
const onSelectPriceChange = () => {
  price.min = minPrices[type.value];
  price.placeholder = minPrices[type.value];
};

//Проверка минимальной цены
const validatePrice = (element) => Number(element) >= price.min;
const getPriceErrorMessage = () => `Цена: от ${minPrices[type.value]}р до ${MAX_PRICE}р`;

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
  pristine.addValidator(title, checkTitle, getTitleErrorMessage, 2, true);
  pristine.addValidator(rooms, validateRooms, 'Количество комнат не соответствует выбранному количеству гостей');
  pristine.addValidator(capacity, validateCapacity, 'Количество гостей не соответствует выбранному количеству комнат');
  pristine.addValidator(price, validatePrice, getPriceErrorMessage, 2, true);
};

const initValidation = () => {
  const pristine = createPristineInstance();
  addValidators(pristine);
  setSlider(()=> pristine.validate(price));

  timein.addEventListener('change', onSelectTimeinChange);
  timeout.addEventListener('change', onSelectTimeoutChange);
  type.addEventListener('change', onSelectPriceChange);

  adForm.addEventListener('submit', (evt) => onFormSubmit(evt, pristine));
  adForm.addEventListener('change', () => onFormChange(pristine));
};

export {initValidation};
