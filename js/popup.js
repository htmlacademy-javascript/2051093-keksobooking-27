import { createRentAdverts } from './data.js';

const map = document.querySelector('.map__canvas');
const mapFragment = document.createDocumentFragment();
const rentAdvertTemplate = document.querySelector('#card').content.querySelector('.popup');

const rentAdverts = createRentAdverts();

const typeRules = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель',
};

rentAdverts.forEach(({offer, author}) => {
  const rentAdvertElement = rentAdvertTemplate.cloneNode(true);
  rentAdvertElement.querySelector('.popup__avatar').src = author.avatar;
  rentAdvertElement.querySelector('.popup__title').textContent = offer.title;
  rentAdvertElement.querySelector('.popup__text--address').textContent = offer.address;
  rentAdvertElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  rentAdvertElement.querySelector('.popup__type').textContent = typeRules[offer.type];
  rentAdvertElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  rentAdvertElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  const featuresContainer = rentAdvertElement.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  if (offer.features) {
    featuresList.forEach((featuresItem) => {
      const isNecessary = offer.features.some((feature) => featuresItem.classList.contains(`popup__feature--${feature}`));

      return (!isNecessary) ? featuresItem.remove() : '';
    });
  } else {featuresContainer.remove();}

  if (offer.description) {
    rentAdvertElement.querySelector('.popup__description').textContent = offer.description;
  } else {rentAdvertElement.querySelector('.popup__description').remove();}

  const photosContainer = rentAdvertElement.querySelector('.popup__photos');
  const photoTemplate = photosContainer.querySelector('.popup__photo');
  if (offer.photos) {
    offer.photos.forEach((photo) => {
      const photoElement = photoTemplate.cloneNode(true);
      photoElement.src = photo;
      photosContainer.appendChild(photoElement);
    });
    photoTemplate.remove();
  } else {photosContainer.remove();}

  mapFragment.appendChild(rentAdvertElement);
});

map.appendChild(mapFragment);

