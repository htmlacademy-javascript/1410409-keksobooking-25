import {toggleAttributeDisabled} from './form.js';
import {renderMarkers} from './map.js';

const mapFilters = document.querySelector('.map__filters');
const housingType = mapFilters.querySelector('#housing-type');
const housingPrice = mapFilters.querySelector('#housing-price');
const housingRooms = mapFilters.querySelector('#housing-rooms');
const housingGuests = mapFilters.querySelector('#housing-guests');


const filterByType = (ad) => housingType.value === 'any' || housingType.value === ad.offer.type;

const filterByPrice = (ad) => {
  if (housingPrice.value === 'any') {
    return true;
  }
  if (housingPrice.value === 'middle') {
    return ad.offer.price >= 10000 && ad.offer.price < 50000;
  }
  if (housingPrice.value === 'low') {
    return ad.offer.price < 10000;
  }
  if (housingPrice.value === 'high') {
    return ad.offer.price >= 50000;
  }
};

const filterByRooms = (ad) => housingRooms.value === 'any' || housingRooms.value === ad.offer.rooms;
const filterByGuests = (ad) => housingGuests.value === 'any' || housingGuests.value === ad.offer.guests;


const activateFilters = (markers, adsLayer) => {
  mapFilters.classList.remove('map__filters--disabled');
  toggleAttributeDisabled(mapFilters.children, false);
  let filterMarkers = markers;

  mapFilters.addEventListener('change', () => {
    console.log(filterMarkers);
    adsLayer.clearLayers();

    filterMarkers = filterMarkers
      .filter(filterByType)
      .filter(filterByPrice)
      .filter(filterByRooms)
      .filter(filterByGuests);

    renderMarkers(filterMarkers.slice(0, 10));
  });
};

export {activateFilters, filterByType};
