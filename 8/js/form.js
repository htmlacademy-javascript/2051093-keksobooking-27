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
const guestsField = adForm.querySelector('#capacity');
const roomsField = adForm.querySelector('#room_number');
const guestMinAmount = 0;
const roomMaxAmount = 3;

const validateCapacity = () => (roomsField.value >= guestsField.value && guestsField.value > guestMinAmount && roomsField.value <= roomMaxAmount) || (roomsField.value === '100' && guestsField.value === '0');

pristine.addValidator(
  guestsField,
  validateCapacity,
  'количество гостей не соответсвует количеству спальных мест'
);

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

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

export {adForm, address, price};
