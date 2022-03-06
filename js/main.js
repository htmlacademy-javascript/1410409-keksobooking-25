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

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

const getRandomArray = (arr, minLength = 0) => {
  const copy = shuffle(arr);
  const rand = getRandomInt(minLength, arr.length);
  return copy.slice(0, rand);
};


const createLocation = () => ({
  lat: getRandomFloat(MIN_LAT, MAX_LAT, 5),
  lng: getRandomFloat(MIN_LNG, MAX_LNG, 5)
});


const createAd = (index, locationAd) => ({
  author: {
    avatar: `img/avatars/user${index.toString().padStart(2, '0')}.png`
  },
  offer: {
    title: getRandomArrayElement(TITLES),
    address: `${locationAd.lat}, ${locationAd.lng}`,
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
    lat: locationAd.lat,
    lng: locationAd.lng
  }
});

const createAds = (count) => {
  const ads = [];

  for (let i = 0; i < count; i++) {
    const elem = createAd(i+1, createLocation());
    ads.push(elem);
  }

  return ads;
};

createAds(MAX_AD_COUNT);
