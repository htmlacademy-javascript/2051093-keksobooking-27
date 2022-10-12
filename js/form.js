const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('.ad-form__element');
const mapFilters = document.querySelector('.map__filters');


const getInactive = () => {
  adFormElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');
};

getInactive(document);

const getActive = () => {
  adFormElements.forEach((element) => {
    element.removeAttribute('disabled');
  });
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');
};

getActive(document);

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'text-help',
});

//Валидация заголовка
const validateTitle = (value) => value.length >= 30 && value.length <= 100;

pristine.addValidator(
  adForm.querySelector('#title'),
  validateTitle,
  'от 30 до 100 символов'
);

// Валидация комнат и гостей
const guestsField = adForm.querySelector('#capacity');
const roomsField = adForm.querySelector('#room_number');

const validateCapacity = () => {
  if (roomsField.value >= guestsField.value && guestsField.value > 0 && roomsField.value <= 3) {
    return true;
  }
  if (roomsField.value === '100' && guestsField.value === '0') {
    return true;
  }
};

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
const time = adForm.querySelector('.ad-form__element--time select');


time.addEventListener('change', () => {
  timeOut.value = timeIn.value;
});

timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
});

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
