import {renderMarkers} from './map.js';
import {showAlert} from './messages.js';

const GET_DATA_SERVER_URL = 'https://25.javascript.pages.academy/keksobooking/data';
const SEND_DATA_SERVER_URL = 'https://25.javascript.pages.academ/keksobooking';
const GET_DATA_ALERT_MESSAGE = 'Ошибка загрузки данных с сервера';

const getData = () => fetch(GET_DATA_SERVER_URL)
  .then((response) => response.json())
  .then((ads) => {
    renderMarkers(ads);
  })
  .catch(() => {
    showAlert(GET_DATA_ALERT_MESSAGE);
  });

const sendData = (onSuccess, onFail, body) => {
  fetch(
    SEND_DATA_SERVER_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {getData, sendData};
