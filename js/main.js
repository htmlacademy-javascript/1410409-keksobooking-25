import {createAds, MAX_AD_COUNT} from './data.js';
import {createAd} from './card.js';
import {deactivateForm, activateForm} from './form.js';
import {initValidation} from './validation.js';
import {createMap} from './map.js';

const ads = createAds(MAX_AD_COUNT);
// const ad = createAd(ads[0]);
//
// const mapCanvas = document.querySelector('.map__canvas');
// mapCanvas.appendChild(ad);

deactivateForm();
createMap (activateForm, initValidation);
