import {getActiveState} from './activate-page.js';
import {address} from './form.js';
import {createCustomPopup} from './popup.js';

const mapZoom = 13;
const locationOfCenter = {
  lat: 35.68950,
  lng: 139.73171,
};

const locationOfMainMarker = {
  lat: 35.68500,
  lng: 139.72700,
};

// Задаем координаты карты
const map = L.map('map-canvas')
  .on('load', () => {
    getActiveState(true);
  })
  .setView (locationOfCenter, mapZoom);

// Создаем слой с картой
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// Добавляем метку
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

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
  return `${lat.toFixed(5)} ${lng.toFixed(5)}`;
};

mainPinMarker.on('moveend', (evt) => {
  address.value = getMarkerLocation(evt.target.getLatLng());
});

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
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
      .addTo(map)
      .bindPopup(createCustomPopup(rentAdvert));
  });
};

const resetMap = () => {
  mainPinMarker.setLatLng(L.latLng(locationOfMainMarker.lat, locationOfMainMarker.lng));
  address.value = `${locationOfMainMarker.lat} ${locationOfMainMarker.lng}`;
  map.closePopup();
};

export {createMarkers, resetMap};
