import {resetImages} from './images.js';
import {requestData} from './data-base.js';
import {isEscapeKey} from './util.js';
import {mapFilters} from './filter.js';
import {resetMap} from './map.js';

const MIN_LENGTH = 30;
const MAX_LENGTH = 100;
const PLACEHOLDER_DEFAULT = 1000;
const SLIDER_STEP = 100;

const adForm = document.querySelector('.ad-form');
const address = adForm.querySelector('#address');
const guestField = adForm.querySelectorAll('#capacity option');
const roomField = adForm.querySelector('#room_number');
const price = adForm.querySelector('#price');
const typeField = adForm.querySelector('#type');
const sliderElement = adForm.querySelector('.ad-form__slider');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');

const numberOfGuests = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

const pricePerNight = {
  min: 0,
  max: 100000,
};

const priceMinRules = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
  hotel: 3000,
};

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'text-help',
});

const validateTitle = (value) => value.length >= MIN_LENGTH && value.length <= MAX_LENGTH;
const getTitleErrorMessage = () => `от ${MIN_LENGTH} до ${MAX_LENGTH} символов`;

pristine.addValidator(
  adForm.querySelector('#title'),
  validateTitle,
  getTitleErrorMessage,
);

const changeRoomVariants = () => {
  const roomValue = roomField.value;

  guestField.forEach((guest) => {
    const isDidabled = (numberOfGuests[roomValue].indexOf(guest.value) === -1);
    guest.selected = numberOfGuests[roomValue][0] === guest.value;
    guest.disabled = isDidabled;
    guest.hidden = isDidabled;
  });
};

changeRoomVariants();
const onRoomFieldChange = () => changeRoomVariants();
roomField.addEventListener('change', onRoomFieldChange);

noUiSlider.create(sliderElement, {
  range: pricePerNight,
  start: price.placeholder,
  step: SLIDER_STEP,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const validatePrice = () => price.value >= priceMinRules[typeField.value];

const getPriceErrorMessage = () => `минимальная цена для данного типа жилья ${priceMinRules[typeField.value]} рублей`;

pristine.addValidator(
  price,
  validatePrice,
  getPriceErrorMessage
);

typeField.addEventListener('change', () => {
  price.placeholder = priceMinRules[typeField.value];
  sliderElement.noUiSlider.set(price.placeholder);
  pristine.validate(price);
});

sliderElement.noUiSlider.on('change', () => {
  price.value = sliderElement.noUiSlider.get();
});

price.addEventListener('change', () => {
  sliderElement.noUiSlider.set(price.value);
});

const resetSlider = () => {
  price.placeholder = PLACEHOLDER_DEFAULT;
  sliderElement.noUiSlider.reset();
};


timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
});

timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
});

/////////////////////////////////////////////////////////////////////////////////////////////

const resetButton = adForm.querySelector('.ad-form__reset');
const successTemlate = document.querySelector('#success').content.querySelector('.success');
const successMessage = successTemlate.cloneNode(true);
const body = document.querySelector('body');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorMessage = errorTemplate.cloneNode(true);


resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  adForm.reset();
  mapFilters.reset();
  resetMap();
  resetSlider();
  resetImages();
});

const onDocumentClick = () => {
  successMessage.remove();
  errorMessage.remove();
  document.removeEventListener('click', onDocumentClick);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    successMessage.remove();
    errorMessage.remove();
  }
  document.removeEventListener('keydown', onDocumentKeydown);
};

const showFormSuccess = () => {
  body.appendChild(successMessage);
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeydown);
  adForm.reset();
  mapFilters.reset();
  resetMap();
  resetSlider();
  resetImages();
};

const showFormError = () => {
  body.appendChild(errorMessage);
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    const formData = new FormData(evt.target);
    requestData(showFormSuccess, showFormError, 'POST',formData);
  }
});

export {adForm, address, price};
