import {getRoomsName, getGuestsName} from './util.js';

const typeRules = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель',
};

const createCustomPopup = ({author,offer}) => {
  const rentTemplate = document.querySelector('#card').content.querySelector('.popup');
  const rentElement = rentTemplate.cloneNode(true);

  rentElement.querySelector('.popup__avatar').src = author.avatar;
  rentElement.querySelector('.popup__title').textContent = offer.title;
  rentElement.querySelector('.popup__text--address').textContent = `Коордтнаты: ${offer.address}`;
  rentElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  rentElement.querySelector('.popup__type').textContent = typeRules[offer.type];
  rentElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} ${getRoomsName(offer.rooms)} для ${offer.guests} ${getGuestsName(offer.guests)}`;
  rentElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  const featuresContainer = rentElement.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  if (offer.features) {
    featuresList.forEach((featuresItem) => {
      const isNecessary = offer.features.some((feature) => featuresItem.classList.contains(`popup__feature--${feature}`));

      return (!isNecessary) ? featuresItem.remove() : '';
    });
  } else {featuresContainer.remove();}

  if (offer.description) {
    rentElement.querySelector('.popup__description').textContent = offer.description;
  } else {rentElement.querySelector('.popup__description').remove();}

  const photosContainer = rentElement.querySelector('.popup__photos');
  const photoTemplate = photosContainer.querySelector('.popup__photo');
  if (offer.photos) {
    offer.photos.forEach((photo) => {
      const photoElement = photoTemplate.cloneNode(true);
      photoElement.src = photo;
      photosContainer.appendChild(photoElement);
    });
    photoTemplate.remove();
  } else {photosContainer.remove();}

  return rentElement;
};

export {createCustomPopup};
