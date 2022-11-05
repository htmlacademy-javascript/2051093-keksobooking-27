import { requestData} from './data-base.js';
import { resetMap } from './map.js';

const adForm = document.querySelector('.ad-form');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'text-help',
});

//Валидация заголовка
const minLength = 30;
const maxLength = 100;
const validateTitle = (value) => value.length >= minLength && value.length <= maxLength;

pristine.addValidator(
  adForm.querySelector('#title'),
  validateTitle,
  'от 30 до 100 символов'
);

// Адрес
const address = adForm.querySelector('#address');

// Валидация комнат и гостей
const guestField = adForm.querySelectorAll('#capacity option');
const roomField = adForm.querySelector('#room_number');

const numberOfGuests = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

const validateRooms = () => {
  const roomValue = roomField.value;

  guestField.forEach((guest) => {
    const isDidabled = (numberOfGuests[roomValue].indexOf(guest.value) === -1);
    guest.selected = numberOfGuests[roomValue][0] === guest.value;
    guest.disabled = isDidabled;
    guest.hidden = isDidabled;
  });
};

validateRooms();

const onRoomFieldChange = () => validateRooms();

roomField.addEventListener('change', onRoomFieldChange);

// Валидация цены
const price = adForm.querySelector('#price');
const typeField = adForm.querySelector('#type');

const priceMinRules = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
  hotel: 3000,
};

const validatePrice = () => price.value >= priceMinRules[typeField.value];

const getPriceErrorMessage = () => `минимальная цена для данного типа жилья ${priceMinRules[typeField.value]} рублей`;

pristine.addValidator(
  price,
  validatePrice,
  getPriceErrorMessage
);

typeField.addEventListener('change', () => {
  price.placeholder = priceMinRules[typeField.value];
  pristine.validate(price);
});

// Валидация въезд-выезд
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');

timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
});

timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
});


const resetButton = adForm.querySelector('.ad-form__reset');

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  adForm.reset();
  resetMap();
});

const successTemlate = document.querySelector('#success').content.querySelector('.success');
const successMessage = successTemlate.cloneNode(true);
const body = document.querySelector('body');

const onSuccessMessageClick = () => {
  successMessage.remove();

  document.removeEventListener('click', onSuccessMessageClick);
};

const onSuccessMessageKeydown = (evt) => {
  if (evt.key === 'Escape') {successMessage.remove();}

  document.removeEventListener('keydown', onSuccessMessageKeydown);
};

const sendFormSuccess = () => {
  body.appendChild(successMessage);
  document.addEventListener('click', onSuccessMessageClick);
  document.addEventListener('keydown', onSuccessMessageKeydown);
  adForm.reset();
  resetMap();
};

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorMessage = errorTemplate.cloneNode(true);

const onErrorMessageClick = () => {
  errorMessage.remove();

  document.removeEventListener('click', onErrorMessageClick);
};

const onErrorMessageKeydown = (evt) => {
  if (evt.key === 'Escape') {errorMessage.remove();}

  document.removeEventListener('keydown', onErrorMessageKeydown);
};

const sendFormError = () => {
  body.appendChild(errorMessage);
  document.addEventListener('click', onErrorMessageClick);
  document.addEventListener('keydown', onErrorMessageKeydown);
};

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    const formData = new FormData(evt.target);
    requestData(sendFormSuccess, sendFormError, 'POST',formData);
  }
});

export {adForm, address, price};
