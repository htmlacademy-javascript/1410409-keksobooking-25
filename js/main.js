import {createAds, MAX_AD_COUNT} from './data.js';
import {createAd} from './card.js';
import {deactivateForm, activateForm} from './form.js';

const ads = createAds(MAX_AD_COUNT);
const ad = createAd(ads[0]);

const mapCanvas = document.querySelector('.map__canvas');
mapCanvas.appendChild(ad);

deactivateForm();
activateForm();
