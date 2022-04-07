import {isEscapeKey} from './util.js';

const ALERT_SHOW_TIME = 5000;

const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

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


const removeMessage = (message) => {
  message.remove();
  document.removeEventListener('keydown', onMessageEscKeydown);
};

function onMessageEscKeydown(evt, message) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeMessage(message);
  }
}

const showSuccessMessage = () => {

  const successMessage = successTemplate.cloneNode(true);

  successMessage.addEventListener('click', () => removeMessage(successMessage));

  document.addEventListener('keydown', (evt) => onMessageEscKeydown(evt, successMessage));

  document.body.append(successMessage);
};

const showFailMessage = () => {
  const errorMessage = errorTemplate.cloneNode(true);
  const errorButton = errorMessage.querySelector('.error__button');

  errorMessage.addEventListener('click', () => removeMessage(errorMessage));
  errorButton.addEventListener('click', () => removeMessage(errorMessage));
  document.addEventListener('keydown', (evt) => onMessageEscKeydown(evt, errorMessage));

  document.body.append(errorMessage);
};

export {showAlert, showSuccessMessage, showFailMessage};
