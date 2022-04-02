import {createAd} from './card.js';

const address = document.querySelector('#address');

const TOKYO = {
  lat: 35.68173,
  lng: 139.75393,
};

const pinIcoMain = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const pinIconCommon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerMain = L.marker(
  {
    lat: TOKYO.lat,
    lng: TOKYO.lng,
  },
  {
    draggable: true,
    icon: pinIcoMain,
  }
);

const createMap = (activateForm, initValidation) => {
  const map = L.map('map-canvas')
    .on('load', () => {
      if (activateForm) {
        activateForm();
      }
      if (initValidation) {
        initValidation();
      }
      address.value = `${TOKYO.lat}, ${TOKYO.lng}`;
    })
    .setView({
      lat: TOKYO.lat,
      lng: TOKYO.lng,
    }, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  markerMain.addTo(map);

  markerMain.on('moveend', (evt) => {
    address.value = `${(evt.target.getLatLng().lat).toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
  });

  return map;
};

const createMarkerCommon = (ad, map) => {
  const adsGroup = L.layerGroup().addTo(map);

  const {location} = ad;

  const markerCommon = L.marker(
    {
      lat: location.lat,
      lng: location.lng,
    },
    {
      icon: pinIconCommon,
    }
  );

  markerCommon
    .addTo(adsGroup)
    .bindPopup(createAd(ad));
};

export {createMap, createMarkerCommon};
