import {adForm} from './form.js';

const mapFilters = document.querySelector('.map__filters');
const adFormElements = adForm.querySelectorAll('fieldset');

const getActiveState = (state) => {
  if (!state) {
    adFormElements.forEach((element) => element.setAttribute('disabled', 'disabled'));
    adForm.classList.add('ad-form--disabled');
    mapFilters.classList.add('map__filters--disabled');
  } else {
    adFormElements.forEach((element) => element.removeAttribute('disabled'));
    adForm.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('map__filters--disabled');
  }
};

getActiveState(false);

export {getActiveState};
