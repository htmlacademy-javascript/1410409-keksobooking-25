import {deactivateForm, activateForm, activateFilters} from './form.js';
import {initValidation} from './validation.js';
import {initMap, renderMarkers} from './map.js';
import {getData} from './api.js';
import {showAlert} from './messages.js';

const MAX_COUNT_ADS = 10;
const GET_DATA_ALERT_MESSAGE = 'Ошибка загрузки данных с сервера';

deactivateForm();

const onLoadSuccess = (markers) => {
  activateFilters();
  renderMarkers(markers.slice(0, MAX_COUNT_ADS));
};

const onLoadFail = () => showAlert(GET_DATA_ALERT_MESSAGE);

initMap(activateForm, initValidation, () => getData(onLoadSuccess, onLoadFail));
