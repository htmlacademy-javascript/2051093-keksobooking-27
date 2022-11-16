import {setFilterState, setFormState} from './activate-page.js';
import {requestData} from './data-base.js';
import {filterData, mapFilters} from './filter.js';
import {address} from './form.js';
import {createCustomPopup} from './popup.js';
import {showAlert, debounce} from './util.js';

const MAP_ZOOM = 13;
const LOCATION_DIGITS = 5;
const ALERT_MESSAGE = 'Проблема доступа к серверу';
const ALERT_TIME = 2000;
const MAX_ADVERTS = 10;
const TIME_DELAY = 500;

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

const mapSettings = {
  lat: 35.68950,
  lng: 139.73171,
};

const mainPinSettings = {
  lat: 35.68500,
  lng: 139.72700,
};

const map = L.map('map-canvas');
const markerGroup = L.layerGroup().addTo(map);

// Создаем слой с картой
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// Добавляем метку
const mainPinMarker = L.marker(
  mainPinSettings,
  {
    draggable: true,
    icon: mainPinIcon,
  },

  address.value = `${mainPinSettings.lat} ${mainPinSettings.lng}`,
);

mainPinMarker.addTo(map);

const getMarkerLocation = (location) => {
  const {lat, lng} = location;
  return `${lat.toFixed(LOCATION_DIGITS)} ${lng.toFixed(LOCATION_DIGITS)}`;
};

mainPinMarker.on('moveend', (evt) => {
  address.value = getMarkerLocation(evt.target.getLatLng());
});

const createMarker = (rentElements) => {
  rentElements.forEach((rentElement) => {
    const marker = L.marker(
      rentElement.location,
      {
        icon,
      },
    );
    marker
      .addTo(markerGroup)
      .bindPopup(createCustomPopup(rentElement));
  });
};

const resetMap = () => {
  mainPinMarker.setLatLng(L.latLng(mainPinSettings.lat, mainPinSettings.lng));
  address.value = `${mainPinSettings.lat} ${mainPinSettings.lng}`;
  map.closePopup();
};

///////////////////////////////////////////////////////////////////////////////

let adverts = [];

const onMapChange = debounce(() => {
  markerGroup.clearLayers();
  createMarker(filterData(adverts));
}, TIME_DELAY);

const onSuccess = (data) => {
  adverts = data.slice();
  createMarker(adverts.slice(0, MAX_ADVERTS));
  setFilterState();
  mapFilters.addEventListener('change', onMapChange);
};

const onError = () => {
  showAlert(ALERT_MESSAGE, ALERT_TIME);
};

map.on('load', () => {
  setFormState();
  requestData(onSuccess, onError, 'GET');
}).setView (mapSettings, MAP_ZOOM);


export {resetMap};
