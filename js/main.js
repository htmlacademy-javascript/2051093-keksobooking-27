//Функция, возвращающая случайное целое число из переданного диапазона включительно
const getRandomNumber = (min, max) => {
  if (min < 0 || max < 0 ) {
    return -1;
  }
  return Math.round(Math.random() * (max - min) + min);
};

//Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно
const getRandomFraction = (min, max) => {
  if (min < 0 || max < 0 ) {
    return -1;
  }
  return Math.random() * (max - min) + min;
};

getRandomNumber(3,10);
getRandomFraction (1.1, 5.4);

// console.log(getRandomFraction(10,26).toFixed(4));
