import './map.js';
import './slider.js';
import './activate-page.js';
import './form.js';
import { getData } from './data-base.js';
import { createMarkers } from './map.js';

const numberOfAdverts = 10;

getData((rentAdvers) => {
  createMarkers(rentAdvers.slice(0, numberOfAdverts));
});
