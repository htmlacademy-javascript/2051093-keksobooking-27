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
const indexes = [];
const getAvatarIndex = () => {
  const index = getRandomIndex(0, 10);
  return (indexes.includes(index)) ? getAvatarIndex() : indexes.push(index), (index < 10) ? `0${index}` : index;
};

const roomTypes = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const time = ['12:00', '13:00', '14:00'];
const featuresItems = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const photosItems = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',];

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

const createRentAdvert = () => {

  const AUTHOR = {
    avatar: `img/avatars/user${getAvatarIndex()}.png`,
  };

  const LOCATION = {
    lat: getRandomIndexFraction(35.65000, 35.70000, 5), //число с плавающей точкой — широта, случайное значение от 35.65000 до 35.70000
    lng: getRandomIndexFraction(139.70000, 139.80000, 5), //число с плавающей точкой — долгота, случайное значение от 139.70000 до 139.80000
  };

  const OFFER = {
    title: '',
    address: `${LOCATION.lat}, ${LOCATION.lng}`,
    price: getRandomIndex(1000, 10000), //random number
    type: roomTypes[getRandomIndex(0, roomTypes.length - 1)], //fix (palace, flat, house, bungalow, hotel),
    rooms: getRandomIndex(0, 10), //random number
    guests: getRandomIndex(0, 10), //random number
    checkin: time[getRandomIndex(0, time.length - 1)],//fix (12:00, 13:00, 14:00),
    checkout: time[getRandomIndex(0, time.length - 1)], // fix (12:00, 13:00, 14:00),
    features: getRandomArray(featuresItems), // массив случайной длины из значений: (wifi, dishwasher, parking, washer, elevator, conditioner),
    description: '',
    photos: getRandomArray(photosItems),
  };

  return {
    AUTHOR,
    LOCATION,
    OFFER,
  };
};

const randomRentAdverts = Array.from({length: 10}, createRentAdvert);

