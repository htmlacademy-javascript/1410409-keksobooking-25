import {createAds, MAX_AD_COUNT} from './data.js';
import {deactivateForm, activateForm} from './form.js';
import {initValidation} from './validation.js';
import {createMap, renderMarkers} from './map.js';
import './slider-price.js';

const ads = createAds(MAX_AD_COUNT);

deactivateForm();

const map = createMap(activateForm, initValidation);

ads.forEach((ad) => {
  renderMarkers(ad, map);
});
