import {createAds, MAX_AD_COUNT, TYPES_MAP} from './data.js';

const mapCanvas = document.querySelector('.map__canvas');

const similarAdTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const similarAds = createAds(MAX_AD_COUNT);
const similarAdsFragment = document.createDocumentFragment();

similarAds.forEach(({author, offer}) => {
  const adElement = similarAdTemplate.cloneNode(true);
  const popupTitle = adElement.querySelector('.popup__title');
  const popupText = adElement.querySelector('.popup__text--address');
  const popupTextPrice = adElement.querySelector('.popup__text--price');
  const popupType = adElement.querySelector('.popup__type');
  const popupTextCapacity = adElement.querySelector('.popup__text--capacity');
  const popupTextTime = adElement.querySelector('.popup__text--time');
  const popupFeatures = adElement.querySelector('.popup__features');
  const featureList = popupFeatures.querySelectorAll('.popup__feature');
  const popupDescription =  adElement.querySelector('.popup__description');
  const popupPhotos = adElement.querySelector('.popup__photos');
  const photoTemplate = popupPhotos.querySelector('.popup__photo');
  const popupAvatar = adElement.querySelector('.popup__avatar');

  if (typeof offer.title !== 'undefined') {
    popupTitle.textContent = offer.title;
  } else {
    popupTitle.classList.add('hidden');
  }

  if (typeof offer.address !== 'undefined') {
    popupText.textContent = offer.address;
  } else {
    popupText.classList.add('hidden');
  }

  if (typeof offer.price !== 'undefined') {
    popupTextPrice.textContent = `${offer.price} ₽/ночь`;
  } else {
    popupTextPrice.classList.add('hidden');
  }

  if (typeof offer.price !== 'undefined') {
    popupType.textContent = TYPES_MAP.get(offer.type);
  } else {
    popupType.classList.add('hidden');
  }

  if (typeof offer.rooms !== 'undefined' && typeof offer.guests !== 'undefined') {
    popupTextCapacity.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  } else {
    popupTextCapacity.classList.add('hidden');
  }

  if (typeof offer.price !== 'undefined') {
    popupTextTime.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  } else {
    popupTextTime.classList.add('hidden');
  }

  if (offer.features.length !== 0) {
    const modifiers = offer.features.map((features) => `popup__feature--${features}`);
    featureList.forEach((featureListItem) => {
      const modifier = featureListItem.classList[1];

      if (!modifiers.includes(modifier)) {
        featureListItem.remove();
      }
    });
  } else {
    popupFeatures.innerHTML = '';
    popupFeatures.classList.add('hidden');
  }

  if (typeof offer.description !== 'undefined') {
    popupDescription.textContent = offer.description;
  } else {
    popupDescription.classList.add('hidden');
  }

  popupPhotos.removeChild(photoTemplate);
  if (offer.photos.length !== 0) {
    offer.photos.forEach((photoEl) => {
      const clonePhoto = photoTemplate.cloneNode();
      clonePhoto.src = photoEl;
      popupPhotos.appendChild(clonePhoto);
    });
  } else {
    popupPhotos.classList.add('hidden');
  }

  if (typeof author.avatar !== 'undefined') {
    popupAvatar.src = author.avatar;
  } else {
    popupAvatar.classList.add('hidden');
  }

  similarAdsFragment.appendChild(adElement);
});

mapCanvas.appendChild(similarAdsFragment.children[0]);
