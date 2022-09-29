//Функция, возвращающая случайное целое число из переданного диапазона включительно
function getRandomNumber (min, max) {
  if (min < 0, max < 0 ) {
    return NaN;
  }
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomFraction (min, max) {
  if (min < 0, max < 0 ) {
    return NaN;
  }
  return Math.random() * (max - min) + min;
}
