const TOKYO = {
  lat: 35.681729,
  lng: 139.753927,
};

const address = document.querySelector('#address');

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const marker = L.marker(
  {
    lat: TOKYO.lat,
    lng: TOKYO.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
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

  marker.addTo(map);




};

export {createMap};
