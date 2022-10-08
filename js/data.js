import {getRandomIndex, getRandomIndexFraction, getRandomArray} from './util.js';

const indexes = [];
const getAvatarIndex = () => {
  const index = getRandomIndex(0, 10);
  return (indexes.includes(index)) ? getAvatarIndex() : indexes.push(index), (index < 10) ? `0${index}` : index;
};

const roomTypes = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const time = ['12:00', '13:00', '14:00'];
const featuresItems = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const photosItems = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',];

const createRentAdvert = () => {

  const author = {
    avatar: `img/avatars/user${getAvatarIndex()}.png`,
  };

  const location = {
    lat: getRandomIndexFraction(35.65000, 35.70000, 5), //число с плавающей точкой — широта, случайное значение от 35.65000 до 35.70000
    lng: getRandomIndexFraction(139.70000, 139.80000, 5), //число с плавающей точкой — долгота, случайное значение от 139.70000 до 139.80000
  };

  const offer = {
    title: 'Уютное бунгало для семьи',
    address: `${location.lat}, ${location.lng}`,
    price: getRandomIndex(1000, 10000), //random number
    type: roomTypes[getRandomIndex(0, roomTypes.length - 1)], //fix (palace, flat, house, bungalow, hotel),
    rooms: getRandomIndex(1, 10), //random number
    guests: getRandomIndex(1, 10), //random number
    checkin: time[getRandomIndex(0, time.length - 1)],//fix (12:00, 13:00, 14:00),
    checkout: time[getRandomIndex(0, time.length - 1)], // fix (12:00, 13:00, 14:00),
    features: getRandomArray(featuresItems), // массив случайной длины из значений: (wifi, dishwasher, parking, washer, elevator, conditioner),
    description: '3 комнаты для семьи',
    photos: getRandomArray(photosItems),
  };

  return {
    author,
    location,
    offer,
  };
};

const createRentAdverts = () => Array.from({length: 1}, createRentAdvert);

export {createRentAdverts};
