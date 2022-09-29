//Функция, возвращающая случайное целое число из переданного диапазона включительно
function getRandomNumber (min, max) {
  if (min < 0, max < 0 ) {
    return NaN;
  }
  return Math.round(Math.random() * (max - min) + min);
}

//Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно
function getRandomFraction (min, max) {
  if (min < 0, max < 0 ) {
    return NaN;
  }
  return Math.random() * (max - min) + min;
}

getRandomNumber(3,10);
getRandomFraction (1.1, 5.4);
