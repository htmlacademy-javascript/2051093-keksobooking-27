import {adForm} from './form.js';

const mapFilters = document.querySelector('.map__filters');
const disabledElements = document.querySelectorAll('select.map__filter', 'fieldset');

const setDisabledState = () => {
  disabledElements.forEach((item) => {
    item.disabled = !item.disabled;
  });
};

const toggleActiveState = () => {
  adForm.classList.toggle('ad-form--disabled');
  mapFilters.classList.toggle('map__filters--disabled');

  setDisabledState();
};

toggleActiveState();

export {toggleActiveState, mapFilters};
