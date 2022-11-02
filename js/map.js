import {toggleActiveState} from './activate-page.js';
import {requestData} from './data-base.js';
import {address} from './form.js';
import {createCustomPopup} from './popup.js';
import { showAlert } from './util.js';

const MAP_ZOOM = 13;
const LOCATION_DIGITS = 5;
const ALERT_MESSAGE = 'Проблема доступа к серверу';

const locationOfCenter = {
  lat: 35.68950,
  lng: 139.73171,
};

const locationOfMainMarker = {
  lat: 35.68500,
  lng: 139.72700,
};

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const map = L.map('map-canvas');

const markerGroup = L.layerGroup().addTo(map);

const numberOfAdverts = 10;

// Создаем слой с картой
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// Добавляем метку
const mainPinMarker = L.marker(
  locationOfMainMarker,
  {
    draggable: true,
    icon: mainPinIcon,
  },

  address.value = `${locationOfMainMarker.lat} ${locationOfMainMarker.lng}`,
);

mainPinMarker.addTo(map);

const getMarkerLocation = (location) => {
  const {lat, lng} = location;
  return `${lat.toFixed(LOCATION_DIGITS)} ${lng.toFixed(LOCATION_DIGITS)}`;
};

mainPinMarker.on('moveend', (evt) => {
  address.value = getMarkerLocation(evt.target.getLatLng());
});

const createMarkers = (rentAdverts) => {
  rentAdverts.forEach((rentAdvert) => {
    const marker = L.marker(
      rentAdvert.location,
      {
        icon,
      },
    );
    marker
      .addTo(markerGroup)
      .bindPopup(createCustomPopup(rentAdvert));
  });
};

const resetMap = () => {
  mainPinMarker.setLatLng(L.latLng(locationOfMainMarker.lat, locationOfMainMarker.lng));
  address.value = `${locationOfMainMarker.lat} ${locationOfMainMarker.lng}`;
  map.closePopup();
};

const onSuccess = (data) => {
  const rentAdverts = data.slice();

  createMarkers(rentAdverts.slice(0, numberOfAdverts));
};

const onError = () => {
  showAlert(ALERT_MESSAGE, 2000);
};

// Задаем координаты карты
map.on('load', () => {
  toggleActiveState();
  requestData(onSuccess, onError, 'GET');
}).setView (locationOfCenter, MAP_ZOOM);


export {createMarkers, resetMap};
