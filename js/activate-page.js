import {mapFilters} from './filter.js';
import {adForm} from './form.js';

const disabledFilters = mapFilters.querySelectorAll('select.map__filter');
const disabledFieldsets = adForm.querySelectorAll('fieldset');

const switchDisabledState = (items) => {
  items.forEach((item) => {
    item.disabled = !item.disabled;
  });
};

const switchFilterState = () => {
  mapFilters.classList.toggle('map__filters--disabled');
  switchDisabledState(disabledFilters);
};

const switchFormState = () => {
  adForm.classList.toggle('ad-form--disabled');
  switchDisabledState(disabledFieldsets);
};

const toggleActiveState = () => {
  switchFilterState();
  switchFormState();
};

export {toggleActiveState, switchFilterState, switchFormState};
