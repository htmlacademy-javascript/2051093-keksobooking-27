import {mapFilters} from './filter.js';
import {adForm} from './form.js';

const disabledFilters = mapFilters.querySelectorAll('select.map__filter');
const disabledFieldsets = adForm.querySelectorAll('fieldset');

const setDisabledState = (items) => {
  items.forEach((item) => {
    item.disabled = !item.disabled;
  });
};

const setFilterState = () => {
  mapFilters.classList.toggle('map__filters--disabled');
  setDisabledState(disabledFilters);
};

const setFormState = () => {
  adForm.classList.toggle('ad-form--disabled');
  setDisabledState(disabledFieldsets);
};

const toggleActiveState = () => {
  setFilterState();
  setFormState();
};

export {toggleActiveState, setFilterState, setFormState};
