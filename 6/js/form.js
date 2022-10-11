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

