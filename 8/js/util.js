const getRandomIndex = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }
  return Math.round(Math.random() * (max - min) + min);
};

const getRandomIndexFraction = (min, max, digits = 1) => {
  if (min < 0 || max < 0) {
    return -1;
  }
  const result = Math.random() * (max - min) + min;
  return + result.toFixed(digits);
};

const getRandomArray = (elements) => {
  const itemIndexes = [];
  const length = getRandomIndex(0, elements.length - 1);
  while (itemIndexes.length < length) {
    const element = elements[getRandomIndex(0, elements.length - 1)];
    if (!itemIndexes.includes(element)) {
      itemIndexes.push(element);
    }
  }
  return itemIndexes;
};

const getRoomsName = (rooms) => {
  switch (rooms) {
    case 1:
      return 'комната';
    case 2:
    case 3:
    case 4:
      return 'комнаты';
    default:
      return 'комнат';
  }
};

const getGuestsName = (guests) => {
  switch (guests) {
    case 1:
      return 'гостя';
    default:
      return 'гостей';
  }
};

export {getRandomIndex, getRandomIndexFraction, getRandomArray, getRoomsName, getGuestsName};
