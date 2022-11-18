import {mapFilters} from './filter.js';
import {adForm} from './form.js';

const disabledFilters = mapFilters.querySelectorAll('select.map__filter');
const disabledFieldsets = adForm.querySelectorAll('fieldset');

const toggleDisabledState = (items) => {
  items.forEach((item) => {
    item.disabled = !item.disabled;
  });
};

const toggleFilterState = () => {
  mapFilters.classList.toggle('map__filters--disabled');
  toggleDisabledState(disabledFilters);
};

const toggleFormState = () => {
  adForm.classList.toggle('ad-form--disabled');
  toggleDisabledState(disabledFieldsets);
};

const toggleActiveState = () => {
  toggleFilterState();
  toggleFormState();
};

export {toggleActiveState, toggleFilterState, toggleFormState};
