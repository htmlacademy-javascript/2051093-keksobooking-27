import {toggleFilterState, toggleFormState} from './activate-page.js';
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

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinMarker = L.marker(
  mainPinSettings,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);
address.value = `${mainPinSettings.lat} ${mainPinSettings.lng}`;

const formatLocation = (location) => {
  const {lat, lng} = location;
  return `${lat.toFixed(LOCATION_DIGITS)} ${lng.toFixed(LOCATION_DIGITS)}`;
};

mainPinMarker.on('moveend', (evt) => {
  address.value = formatLocation(evt.target.getLatLng());
});

const renderMarker = (rentElements) => {
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

///////////////////////////////////////////////////////////////////////////////

let adverts = [];

const onMapChange = debounce(() => {
  markerGroup.clearLayers();
  renderMarker(filterData(adverts));
}, TIME_DELAY);

const onSuccess = (data) => {
  adverts = data.slice();
  renderMarker(adverts.slice(0, MAX_ADVERTS));
  toggleFilterState();
  mapFilters.addEventListener('change', onMapChange);
};

const onError = () => {
  showAlert(ALERT_MESSAGE, ALERT_TIME);
};

map.on('load', () => {
  toggleFormState();
  requestData(onSuccess, onError, 'GET');
}).setView (mapSettings, MAP_ZOOM);

const resetMap = () => {
  markerGroup.clearLayers();
  map.setView(mapSettings, MAP_ZOOM);
  mainPinMarker.setLatLng(L.latLng(mainPinSettings.lat, mainPinSettings.lng));
  address.value = `${mainPinSettings.lat} ${mainPinSettings.lng}`;
  renderMarker(adverts.slice(0, MAX_ADVERTS));
};

export {resetMap};
