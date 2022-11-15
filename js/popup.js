import {getRoomsName, getGuestsName} from './util.js';

const rentTemplate = document.querySelector('#card').content.querySelector('.popup');
const rentElement = rentTemplate.cloneNode(true);
const avatar = rentElement.querySelector('.popup__avatar');
const title = rentElement.querySelector('.popup__title');
const address = rentElement.querySelector('.popup__text--address');
const price = rentElement.querySelector('.popup__text--price');
const type = rentElement.querySelector('.popup__type');
const capacity = rentElement.querySelector('.popup__text--capacity');
const time = rentElement.querySelector('.popup__text--time');
const featuresContainer = rentElement.querySelector('.popup__features');
const featuresList = featuresContainer.querySelectorAll('.popup__feature');
const description = rentElement.querySelector('.popup__description');
const photosContainer = rentElement.querySelector('.popup__photos');
const photoTemplate = photosContainer.querySelector('.popup__photo');

const typeRules = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель',
};

function createCustomPopup({ author, offer }) {
  if (author.avatar) {
    avatar.src = author.avatar;
  } else {
    avatar.remove();
  }

  if (offer.title) {
    title.textContent = offer.title;
  } else {
    title.remove();
  }

  if (offer.address) {
    address.textContent = `Коордтнаты: ${offer.address}`;
  } else {
    address.remove();
  }

  if (offer.price) {
    price.textContent = `${offer.price} ₽/ночь`;
  } else {
    price.remove();
  }

  if (offer.type) {
    type.textContent = typeRules[offer.type];
  } else {
    type.remove();
  }

  if (offer.rooms && offer.guests) {
    capacity.textContent = `${offer.rooms} ${getRoomsName(offer.rooms)} для ${offer.guests} ${getGuestsName(offer.guests)}`;
  } else {
    capacity.remove();
  }

  if (offer.checkin && offer.checkout) {
    time.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  } else {
    time.remove();
  }

  if (offer.features) {
    featuresList.forEach((featuresItem) => {
      const isNecessary = offer.features.some((feature) => featuresItem.classList.contains(`popup__feature--${feature}`));

      return (!isNecessary) ? featuresItem.remove() : '';
    });
  } else {
    featuresContainer.remove();
  }

  if (offer.description) {
    description.textContent = offer.description;
  } else {
    description.remove();
  }

  if (offer.photos) {
    offer.photos.forEach((photo) => {
      const photoElement = photoTemplate.cloneNode(true);
      photoElement.src = photo;
      photosContainer.appendChild(photoElement);
    });
    photoTemplate.remove();
  } else {
    photosContainer.remove();
  }

  return rentElement;
}

export {createCustomPopup};
