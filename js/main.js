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

// функция перемешивания элементов массива взята отсюда https://learn.javascript.ru/task/shuffle
const shuffleArr = (array) => {
  const arrTemp = array.slice();
  for (let i = arrTemp.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrTemp[i], arrTemp[j]] = [arrTemp[j], arrTemp[i]];
  }
  return arrTemp;
};

const getAvatarSrcImgArr = (countSrc) => {
  const arr = [];
  for (let i = 1; i <= countSrc; i++) {
    if (i < 10) {
      arr.push(`img/avatars/user0${  i  }.png`);
    } else {
      arr.push(`img/avatars/user${  i  }.png`);
    }
  }
  return arr;
};

const getRandomElFromArray = (elementsArr) => elementsArr[getRandomInt(0, elementsArr.length -1)];

const getRandomArrayFromArray = (arr, minLength = 0) => {
  const arrTemp = shuffleArr(arr).slice();
  arrTemp.length = getRandomInt(minLength, arr.length);
  return arrTemp;
};

const avatarSrcImgArr = getAvatarSrcImgArr(10);

const titlesOfferArr = [
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

const typesArr = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const checkTimesArr = [
  '12:00',
  '13:00',
  '14:00'
];

const featuresArr = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const descriptionsOfferArr = [
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

const photosArr = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const createAuthor = (element) =>
  ({
    avatar: element
  });

const createOffer = () =>
  ({
    title: getRandomElFromArray(titlesOfferArr),
    address: `${getRandomFloat(35.65, 35.7, 5)  }, ${  getRandomFloat(139.7, 139.8, 5)}`,
    price: getRandomInt(1, 1000),
    type: getRandomElFromArray(typesArr),
    rooms: getRandomInt(1, 4),
    guests: getRandomInt(1, 10),
    checkin: getRandomElFromArray(checkTimesArr),
    checkout: getRandomElFromArray(checkTimesArr),
    features: getRandomArrayFromArray(featuresArr),
    description: getRandomElFromArray(descriptionsOfferArr),
    photos: getRandomArrayFromArray(photosArr)
  });

const createLocation = () =>
  ({
    lat: getRandomFloat(35.65, 35.7, 5),
    lng: getRandomFloat(139.7, 139.8, 5)
  });

const createNewNearbyAd = (elem) =>
  ({
    author: createAuthor(elem),
    offer: createOffer(),
    location: createLocation()
  });

const createNearbyAdsArr = (count = 10) => {
  const avatarSrcImgArrShuffle = shuffleArr(avatarSrcImgArr);
  const nearbyAds = [];

  for (let i = 0; i < count; i++) {
    nearbyAds[i] = createNewNearbyAd(avatarSrcImgArrShuffle[i]);
  }
  return nearbyAds;
};

createNearbyAdsArr();
