function getrandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  if (min < 0 || max < 0) {
    return 'введен неверный диапазон -> диапазон может быть только положительный, включая ноль';
  }
  if (min === max) {
    return min;
  }

  if (min > max) {
    return Math.floor(Math.random() * (min - max + 1) + max);
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomFloat (min = 1, max = 1, decimal = 0) {
  if (min < 0 || max < 0 || decimal < 0) {
    return 'введен неверный диапазон -> диапазон может быть только положительный, включая ноль';
  }
  if (min === max) {
    return min.toFixed(decimal);
  }

  if (min > max) {
    return (Math.random() * (min - max) + max).toFixed(decimal);
  }

  return (Math.random() * (max - min) + min).toFixed(decimal);
}

getrandomInt();
getRandomFloat();
