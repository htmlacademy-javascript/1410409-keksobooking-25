import {setSlider} from './slider-price.js';
import {sendData} from './api.js';
import {resetForm} from './form.js';
import {showFailMessage, showSuccessMessage} from './messages.js';
import {adForm, type, price, resetButton} from './elements.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 100000;

const ROOMS_OPTION = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

const MIN_PRICES = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};

const submitButton = adForm.querySelector('.ad-form__submit');
const title = adForm.querySelector('#title');
const rooms = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');

const createPristineInstance = () => new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span', errorTextClass: 'ad-form__error'
});

//Проверка заголовка на пробелы
const checkTitle = (value) => value && value.trim() !== '' && value.length >= MIN_TITLE_LENGTH && value.length <= MAX_TITLE_LENGTH;
const getTitleErrorMessage = () => `Длина заголовка нужна от ${MIN_TITLE_LENGTH} до ${MAX_TITLE_LENGTH} символов. Вы ввели ${title.value.length} символов`;

//зависимость поля "Цена за ночь" от типа жилья
const onSelectPriceChange = () => {
  price.min = MIN_PRICES[type.value];
  price.placeholder = MIN_PRICES[type.value];
};

//Проверка минимальной цены
const validatePrice = (element) => Number(element) >= price.min;
const getPriceErrorMessage = () => `Цена: от ${MIN_PRICES[type.value]}р до ${MAX_PRICE}р`;

//проверка соответствия полей количество комнат и количество мест
const validateCapacity = (element) => ROOMS_OPTION[rooms.value].includes(element);
const validateRooms = (element) => ROOMS_OPTION[element].includes(capacity.value);

//синхронизация времени заезда и выезда
const onSelectTimeInChange = () => {
  timeOut.value = timeIn.value;
};
const onSelectTimeOutChange = () => {
  timeIn.value = timeOut.value;
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const blockResetButton = () => {
  resetButton.disabled = true;
};

const unblockResetButton = () => {
  resetButton.disabled = false;
};

//Общая проверка формы
const onAdFormSubmit = (evt, pristine) => {
  evt.preventDefault();
  if (pristine.validate()) {
    blockSubmitButton();
    blockResetButton();
    sendData(
      () => {
        showSuccessMessage();
        resetForm();
        pristine.reset();
        unblockSubmitButton();
        unblockResetButton();
      },
      () => {
        showFailMessage();
        unblockSubmitButton();
        unblockResetButton();
      },
      new FormData(evt.target),
    );
  }
};

const onAdFormChange = (pristine) => {
  pristine.validate();
};

const onResetButtonClick = (pristine) => {
  pristine.reset();
};

const addValidators = (pristine) => {
  pristine.addValidator(title, checkTitle, getTitleErrorMessage, 2, true);
  pristine.addValidator(rooms, validateRooms, 'Количество комнат не соответствует выбранному количеству гостей');
  pristine.addValidator(capacity, validateCapacity, 'Количество гостей не соответствует выбранному количеству комнат');
  pristine.addValidator(price, validatePrice, getPriceErrorMessage, 2, true);
};

const initValidation = () => {
  const pristine = createPristineInstance();
  price.min = MIN_PRICES[type.value];
  addValidators(pristine);
  setSlider(()=> pristine.validate(price));

  timeIn.addEventListener('change', onSelectTimeInChange);
  timeOut.addEventListener('change', onSelectTimeOutChange);
  type.addEventListener('change', onSelectPriceChange);

  adForm.addEventListener('submit', (evt) => onAdFormSubmit(evt, pristine));
  adForm.addEventListener('change', () => onAdFormChange(pristine));
  resetButton.addEventListener('click', () => onResetButtonClick(pristine));
};

export {initValidation, MIN_PRICES};
