import {toggleAttributeDisabled} from './form.js';
import {clearMap, renderMarkers} from './map.js';
import {debounce} from './util.js';

const mapFilters = document.querySelector('.map__filters');
const housingType = mapFilters.querySelector('#housing-type');
const housingPrice = mapFilters.querySelector('#housing-price');
const housingRooms = mapFilters.querySelector('#housing-rooms');
const housingGuests = mapFilters.querySelector('#housing-guests');
const housingFeatures = mapFilters.querySelector('#housing-features');


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

const filterByRooms = (ad) => housingRooms.value === 'any' || Number(housingRooms.value) === ad.offer.rooms;

const filterByGuests = (ad) => housingGuests.value === 'any' || Number(housingGuests.value) === ad.offer.guests;

const getFeaturesRank = (ad) => {
  const checkedFeatures = housingFeatures.querySelectorAll('[type="checkbox"]:checked');

  if(!checkedFeatures.length) {
    return 1;
  }

  let rank = 0;

  if (!ad.offer.features) {
    return rank;
  }

  for (let i = 0; i < checkedFeatures.length; i++) {
    if (ad.offer.features.includes(checkedFeatures[i].value)) {
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
  .filter(filterByType)
  .filter(filterByPrice)
  .filter(filterByRooms)
  .filter(filterByGuests)
  .filter(filterByFeatures)
  .sort(compareAdsByFeatures);

const renderFilteredMarkers = (markers, MAX_COUNT_ADS) => {
  clearMap();
  renderMarkers(getFilteredMarkers(markers).slice(0, MAX_COUNT_ADS));
};

const setFiltersChange = (cb) => {
  mapFilters.addEventListener('change', () => {
    cb();
  });
};

const activateFilters = (markers, MAX_COUNT_ADS, RERENDER_DELAY) => {
  mapFilters.classList.remove('map__filters--disabled');
  toggleAttributeDisabled(mapFilters.children, false);

  setFiltersChange(debounce(() => renderFilteredMarkers(markers, MAX_COUNT_ADS), RERENDER_DELAY));
};

export {activateFilters};
