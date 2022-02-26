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

//Создание массива с ссылками на автары пользователя

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
  return shuffleArr(arr);
};

const avatarSrcImgArr = getAvatarSrcImgArr(10);

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length -1)];

const nearAd = {
  author: {
    avatar: getRandomArrayElement(avatarSrcImgArr)
  },
  offer: {
    title: 'Шикарный гараж',
    address: '35.65000, 139.70000',
    price: 500,
    type: 'palace',
    rooms: 3,
    guests: 3,
    checkin: '14:00',
    checkout: '12:00',
    features: ['wifi', 'dishwasher', 'parking', 'washer'],
    description: 'Лучший гараж для отдыха',
    photos: [
      'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
      'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
    ],
  },
  location: {
    lat: 35.70000,
    lng: 139.80000
  }
};
