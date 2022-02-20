const getRandomInt = (min, max) => {
  const from = Math.ceil(min);
  const to = Math.floor(max);

  if (from >= to || from < 0) {
    return RangeError('введен неверный диапазон');
  }

  return Math.floor(Math.random() * (to - from + 1) + from);
};

const getRandomFloat = (min = 1, max = 1, decimal = 5) => {
  if (min >= max || max < 0 || decimal < 0) {
    return RangeError('введено отрцательное значение диапазона');
  }
  return +(Math.random() * (max - min) + min).toFixed(decimal);
};

getRandomInt();
getRandomFloat();
