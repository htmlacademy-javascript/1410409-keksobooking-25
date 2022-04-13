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
  alertContainer.style.zIndex = '1000';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.right = '0';
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


const showMessage = (node) => {
  const message = node.cloneNode(true);

  const removeMessage = () => {
    message.remove();
    document.removeEventListener('keydown', onDocumentEscKeydown);
  };

  function onDocumentEscKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      removeMessage(message);
    }
  }

  message.addEventListener('click', () => removeMessage(message));
  document.addEventListener('keydown', onDocumentEscKeydown);
  document.body.append(message);
};


const showSuccessMessage = () => showMessage(successTemplate);
const showFailMessage = () => showMessage(errorTemplate);

export {showAlert, showSuccessMessage, showFailMessage};
