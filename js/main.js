import {deactivateForm, activateForm} from './form.js';
import {initValidation} from './validation.js';
import {initMap} from './map.js';
import {getData} from './load.js';

deactivateForm();

initMap(activateForm, initValidation);

getData();
