import {createAd} from './card.js';

const address = document.querySelector('#address');

const ZOOM_START = 12;
const LAYER_TILE = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const LAYER_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';


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

const map = L.map('map-canvas');
const adsGroup = L.layerGroup().addTo(map);


const setAddress = (value) => {
  address.value = value;
};

const onMarkerMove = (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  setAddress(`${lat.toFixed(5)}, ${lng.toFixed(5)}`);
};


const initMap = (activateForm, initValidation, loadData) => {

  map.on('load', () => {
    if (activateForm) {
      activateForm();
    }
    if (initValidation) {
      initValidation();
    }
    setAddress(`${TOKYO.lat}, ${TOKYO.lng}`);

    loadData();
  })
    .setView({
      lat: TOKYO.lat,
      lng: TOKYO.lng,
    }, ZOOM_START);

  L.tileLayer(
    LAYER_TILE,
    {
      attribution: LAYER_ATTRIBUTION,
    },
  ).addTo(map);

  markerMain.addTo(map);

  markerMain.on('move', onMarkerMove);

  return map;
};

const renderMarkers = (ads) => {
  ads.forEach((ad) => {
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
  });
};

const resetMap = () => {
  markerMain.setLatLng({
    lat: TOKYO.lat,
    lng: TOKYO.lng,
  });
  map.setView({
    lat: TOKYO.lat,
    lng: TOKYO.lng,
  }, ZOOM_START);
  map.closePopup();
  const {lat, lng} = markerMain.getLatLng();
  setAddress(`${lat}, ${lng}`);
};

const clearMap = () => {
  adsGroup.clearLayers();
};

export {initMap, renderMarkers, resetMap, setAddress, clearMap};
