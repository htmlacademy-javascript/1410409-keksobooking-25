import {getRandomInt, getRandomFloat, getRandomArrayElement, getRandomArray} from './util.js';

const MAX_AD_COUNT = 10;

const MAX_LAT = 35.7;
const MIN_LAT = 35.65;
const MAX_LNG = 139.8;
const MIN_LNG = 139.7;

const TITLES = [
  'Гараж',
  'Здание',
  'Особняк',
  'Лодка',
  'Гостиница',
  'Отель',
  'Хостел',
  'Столовая',
  'Квартира-студия',
  'Капсула сна'
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const CHECK_TIMES = [
  '12:00',
  '13:00',
  '14:00'
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const DESCRIPTIONS = [
  'Шикарный гараж',
  'Офисное здание',
  'Уютный особняк',
  'Лодка для ночлега',
  'Гостиница без удобств',
  'Отель несколько звезд',
  'Хостел без запаха',
  'Ароматная столовая',
  'Просторная квартира-студия',
  'Капсула сна на вокзале'
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const createLocation = () => ({
  lat: getRandomFloat(MIN_LAT, MAX_LAT, 5),
  lng: getRandomFloat(MIN_LNG, MAX_LNG, 5)
});

const createAd = (index) => {
  const { lat, lng } = createLocation();

  return {
    author: {
      avatar: `img/avatars/user${index.toString().padStart(2, '0')}.png`
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${lat}, ${lng}`,
      price: getRandomInt(1, 1000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomInt(1, 4),
      guests: getRandomInt(1, 10),
      checkin: getRandomArrayElement(CHECK_TIMES),
      checkout: getRandomArrayElement(CHECK_TIMES),
      features: getRandomArray(FEATURES),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: getRandomArray(PHOTOS)
    },
    location: {
      lat,
      lng
    }
  };
};

const createAds = (count) => Array.from({length: count}, (_, index) => createAd(index + 1));

export {createAds, MAX_AD_COUNT};
