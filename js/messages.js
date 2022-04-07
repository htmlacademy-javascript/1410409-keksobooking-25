import {isEscapeKey} from './util.js';


const ALERT_SHOW_TIME = 5000;

const sucessTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 1000;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.right = 0;
  alertContainer.style.margin = 'auto';
  alertContainer.style.width = '500px';
  alertContainer.style.top = '110px';
  alertContainer.style.padding = '10px 5px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.style.borderRadius = '5px';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const onMessageEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    message.remove();
  }
};

const showMessageSuccess = () => {

  const message = sucessTemplate.cloneNode(true);

  message.addEventListener('click', () => {
    message.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      message.remove();
    }
  });

  document.body.append(message);
};


export {showAlert, showMessageSuccess};
