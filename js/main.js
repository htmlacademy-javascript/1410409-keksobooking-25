import {createAds, MAX_AD_COUNT} from './data.js';
import {deactivateForm, activateForm} from './form.js';
import {initValidation} from './validation.js';
import {initMap, renderMarkers} from './map.js';


const ads = createAds(MAX_AD_COUNT);

deactivateForm();

initMap(activateForm, initValidation);

renderMarkers(ads);


