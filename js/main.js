// imports
// const
// vars
// funs
//exe

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

const DISCRIPTIONS = [
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

const MAX_AD_COUNT = 10;


const getRandomInt = (min, max) => {
  const from = Math.ceil(min);
  const to = Math.floor(max);

  if (from >= to || from < 0) {
    throw new RangeError('введен неверный диапазон');
  }

  return Math.floor(Math.random() * (to - from + 1) + from);
};

const getRandomFloat = (min, max, decimal = 5) => {
  if (min >= max || max < 0 || decimal < 0) {
    throw new RangeError('введен неверный диапазон или отрицательное количество знаков после запятой');
  }

  return Number((Math.random() * (max - min) + min).toFixed(decimal));
};


const shuffle = (array) => {
  const copy = array.slice();

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
};

const getAvatarSrcImgArr = (countSrc) => {
  const arr = [];

  for (let i = 1; i <= countSrc; i++) {
    if (i < 10) {
      arr.push(`img/avatars/user0${i}.png`);
    } else {
      arr.push(`img/avatars/user${i}.png`);
    }
  }

  return arr;
};

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

const getRandomArray = (arr, minLength = 0) => {
  const copy = shuffle(arr);
  copy.length = getRandomInt(minLength, arr.length);
  return copy;
};






const avatarSrcImgArr = getAvatarSrcImgArr(10);



const createAuthor = (element) => ({
  avatar: element
});

const createOffer = () => ({
  title: getRandomArrayElement(TITLES),
  address: `${getRandomFloat(35.65, 35.7, 5)}, ${getRandomFloat(139.7, 139.8, 5)}`,
  price: getRandomInt(1, 1000),
  type: getRandomArrayElement(TYPES),
  rooms: getRandomInt(1, 4),
  guests: getRandomInt(1, 10),
  checkin: getRandomArrayElement(CHECK_TIMES),
  checkout: getRandomArrayElement(CHECK_TIMES),
  features: getRandomArray(FEATURES),
  description: getRandomArrayElement(DISCRIPTIONS),
  photos: getRandomArray(PHOTOS)
});

const createLocation = () => ({
  lat: getRandomFloat(35.65, 35.7, 5),
  lng: getRandomFloat(139.7, 139.8, 5)
});

const createAd = (element) => ({
  author: {
    avatar: element
  },
  offer: {
    title: getRandomArrayElement(TITLES),
    address: `${location.lat}, ${this.location.lng}`,
    price: getRandomInt(1, 1000),
    type: getRandomArrayElement(TYPES),
    rooms: getRandomInt(1, 4),
    guests: getRandomInt(1, 10),
    checkin: getRandomArrayElement(CHECK_TIMES),
    checkout: getRandomArrayElement(CHECK_TIMES),
    features: getRandomArray(FEATURES),
    description: getRandomArrayElement(DISCRIPTIONS),
    photos: getRandomArray(PHOTOS)
  },
  location: {
    lat: getRandomFloat(35.65, 35.7, 5),
    lng: getRandomFloat(139.7, 139.8, 5)
  }
});

const createAds = (count) => {
  const avatarSrcImgArrShuffle = shuffle(avatarSrcImgArr);
  const nearbyAds = [];

  for (let i = 0; i < count; i++) {
    nearbyAds[i] = createAd(avatarSrcImgArrShuffle[i]);
  }
  return nearbyAds;
};


const createNearAd = (element) => {
const locationAd = createLocation();

};

console.log(createAds(MAX_AD_COUNT));
