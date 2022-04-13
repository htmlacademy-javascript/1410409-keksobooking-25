import {adForm} from './form.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const photoChooser = adForm.querySelector('#images');
const photoElement = adForm.querySelector('.ad-form__photo');
const photoContainer = adForm.querySelector('.ad-form__photo-container');

photoChooser.addEventListener('change', () => {
  photoElement.remove();

  Array.from(photoChooser.files).forEach((file) => {
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const container = document.createElement('div');
      const photoPreview = document.createElement('img');
      container.classList.add('ad-form__photo');
      photoPreview.style.width = '70px';
      photoPreview.style.height = '70px';
      photoPreview.style.borderRadius = '5px';
      photoPreview.src = URL.createObjectURL(file);
      container.append(photoPreview);
      photoContainer.append(container);
    }
  });
});

adForm.addEventListener('reset', () => {
  const photos = photoContainer.querySelectorAll('.ad-form__photo');
  photos.forEach((item) => item.remove());
  const container = document.createElement('div');
  container.classList.add('ad-form__photo');
  photoContainer.append(container);
});
