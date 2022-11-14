const FILE_RULES = ['jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR = 'img/muffin-grey.svg';

const avatarField = document.querySelector('#avatar');
const preview = document.querySelector('.ad-form-header__preview img');
const photoField = document.querySelector('#images');
const previewPhoto = document.querySelector('.ad-form__photo');

avatarField.addEventListener('change', () => {
  const file = avatarField.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_RULES.some((type) => fileName.endsWith(type));

  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
});

photoField.addEventListener('change', () => {
  const file = photoField.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_RULES.some((type) => fileName.endsWith(type));

  if (matches) {
    previewPhoto.innerHTML = '';
    const photo = document.createElement('img');
    photo.src = URL.createObjectURL(file);
    photo.style.width = '100%';
    photo.style.height = 'auto';
    previewPhoto.append(photo);
  }
});

const resetImages = () => {
  preview.src = DEFAULT_AVATAR;
  previewPhoto.innerHTML = '';
};

export {resetImages};
