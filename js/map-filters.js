import {toggleAttributeDisabled} from './form.js';
import {clearMap, renderMarkers} from './map.js';
import {debounce} from './util.js';

const PRICE_MIDDLE = 10000;
const PRICE_HIGHT = 50000;
const DEFAULT_VALUE = 'any';

const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const housingType = mapFilters.querySelector('#housing-type');
const housingPrice = mapFilters.querySelector('#housing-price');
const housingRooms = mapFilters.querySelector('#housing-rooms');
const housingGuests = mapFilters.querySelector('#housing-guests');
const housingFeatures = mapFilters.querySelector('#housing-features');


const filterByType = ({ offer }) => housingType.value === DEFAULT_VALUE || housingType.value === offer.type;

const filterByPrice = ({ offer }) => {
  if (housingPrice.value === DEFAULT_VALUE) {
    return true;
  }

  if (housingPrice.value === 'middle') {
    return offer.price >= PRICE_MIDDLE && offer.price < PRICE_HIGHT;
  }

  if (housingPrice.value === 'low') {
    return offer.price < PRICE_MIDDLE;
  }

  return offer.price >= PRICE_HIGHT;
};

const filterByRooms = ({ offer }) => housingRooms.value === DEFAULT_VALUE || Number(housingRooms.value) === offer.rooms;

const filterByGuests = ({ offer }) => housingGuests.value === DEFAULT_VALUE || Number(housingGuests.value) === offer.guests;

const getFeaturesRank = ({ offer }) => {
  const checkedFeatures = housingFeatures.querySelectorAll('[type="checkbox"]:checked');

  if(!checkedFeatures.length) {
    return 1;
  }

  let rank = 0;

  if (!offer.features) {
    return rank;
  }

  for (let i = 0; i < checkedFeatures.length; i++) {
    if (offer.features.includes(checkedFeatures[i].value)) {
      rank++;
    } else {
      rank = 0;
      break;
    }
  }

  return rank;
};

const filterByFeatures = (ad) => getFeaturesRank(ad);

const compareAdsByFeatures = (ad1, ad2) => getFeaturesRank(ad2) - getFeaturesRank(ad1);

const getFilteredMarkers = (markers) => markers
  .filter((item) => filterByType(item) && filterByPrice(item) && filterByRooms(item) && filterByGuests(item) && filterByFeatures(item))
  .sort(compareAdsByFeatures);

const renderFilteredMarkers = (markers, maxMarkersAmount) => {
  clearMap();
  renderMarkers(getFilteredMarkers(markers).slice(0, maxMarkersAmount));
};

const setFilterListener = (cb) => {
  mapFilters.addEventListener('change', () => {
    cb();
  });
};

const activateFilters = (markers, maxMarkersAmount) => {
  mapFilters.classList.remove('map__filters--disabled');
  toggleAttributeDisabled(mapFilters.children, false);

  setFilterListener(debounce(() => renderFilteredMarkers(markers, maxMarkersAmount)));
};

export {activateFilters, renderFilteredMarkers};
