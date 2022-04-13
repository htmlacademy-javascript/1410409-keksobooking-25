import {adForm} from './form.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR = 'img/muffin-grey.svg';

const avatarChooser = adForm.querySelector('#avatar');
const avatarPreview = adForm.querySelector('.avatar-preview');

avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

adForm.addEventListener('reset', () => {
  avatarPreview.src = DEFAULT_AVATAR;
});
