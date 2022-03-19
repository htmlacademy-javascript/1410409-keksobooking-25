import {wordDeclension} from './util.js';

const TYPES_MAP = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const roomsDeclension = ['комната', 'комнаты', 'комнат'];
const guestsDeclension = ['гостя', 'гостей', 'гостей'];
const adTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const fillTextContentData = (data, block, content) => {
  if (data) {
    block.textContent = content;
  } else {
    block.remove();
  }
};

const createAd = (({author, offer}) => {
  const adElement = adTemplate.cloneNode(true);
  const popupTitle = adElement.querySelector('.popup__title');
  const popupText = adElement.querySelector('.popup__text--address');
  const popupTextPrice = adElement.querySelector('.popup__text--price');
  const popupType = adElement.querySelector('.popup__type');
  const popupTextCapacity = adElement.querySelector('.popup__text--capacity');
  const popupTextTime = adElement.querySelector('.popup__text--time');
  const popupFeatures = adElement.querySelector('.popup__features');
  const popupDescription = adElement.querySelector('.popup__description');
  const popupPhotos = adElement.querySelector('.popup__photos');
  const popupAvatar = adElement.querySelector('.popup__avatar');

  fillTextContentData(offer.title, popupTitle, offer.title);
  fillTextContentData(offer.address, popupText, offer.address);
  fillTextContentData(offer.price, popupTextPrice, `${offer.price} ₽/ночь`);
  fillTextContentData(offer.type, popupType, TYPES_MAP[offer.type]);

  fillTextContentData(
    offer.rooms,
    popupTextCapacity,
    `${offer.rooms} ${wordDeclension(offer.rooms, roomsDeclension)} для ${offer.guests} ${wordDeclension(offer.guests, guestsDeclension)}`);

  fillTextContentData(offer.checkin, popupTextTime, `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`);
  fillTextContentData(offer.description, popupDescription, offer.description);

  if (offer.features.length > 0) {
    popupFeatures.innerHTML = '';
    offer.features.forEach((feature) => {
      const element = `<li class="popup__feature popup__feature--${feature}"></li>`;
      popupFeatures.insertAdjacentHTML('beforeend', element);
    });
  } else {
    popupFeatures.remove();
  }

  if (offer.photos.length > 0) {
    popupPhotos.innerHTML = '';
    offer.photos.forEach((photo) => {
      const image = `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`;
      popupPhotos.insertAdjacentHTML('beforeend', image);
    });
  } else {
    popupPhotos.remove();
  }

  if (author.avatar) {
    popupAvatar.src = author.avatar;
  } else {
    popupAvatar.remove();
  }

  return adElement;
});

export {createAd};
