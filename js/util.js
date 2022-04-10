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

const wordDeclension = (number, words) => (
  words[(number % 100 > 4 && number % 100 < 20)
    ? 2
    : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]]
);

const isEscapeKey = (evt) => evt.key === 'Escape';

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {getRandomInt, getRandomFloat, getRandomArrayElement, getRandomArray, wordDeclension, isEscapeKey, debounce};
