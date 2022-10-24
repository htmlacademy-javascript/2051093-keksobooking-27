import { price } from './form.js';

//global noUiSlider: readonly
const sliderElement = document.querySelector('.ad-form__slider');

const pricePerNight = {
  min: 0,
  max: 100000,
};

noUiSlider.create(sliderElement, {
  range: pricePerNight,
  start: 1000,
  step: 100,
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

sliderElement.noUiSlider.on('update', () => {
  price.value = sliderElement.noUiSlider.get();
});

price.addEventListener('change', () => sliderElement.noUiSlider.set(price.value));

