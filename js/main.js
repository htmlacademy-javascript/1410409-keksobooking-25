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

getRandomInt();
getRandomFloat();
