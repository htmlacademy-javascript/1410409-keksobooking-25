const TOKYO = {
  lat: 35.68173,
  lng: 139.75393,
};

const address = document.querySelector('#address');

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

const markerCommon = L.marker(
  {
    lat: 35.56441,
    lng: 139.99825,
  },
  {
    draggable: true,
    icon: pinIconCommon,
  }
);


const createMap = (activateForm, initValidation) => {
  const map = L.map('map-canvas')
    .on('load', () => {
      if (activateForm) {
        activateForm();
      }
      if(initValidation) {
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
  markerCommon.addTo(map);

  markerMain.on('moveend', (evt) => {
    address.value = `${(evt.target.getLatLng().lat).toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
  });



};

export {createMap};
