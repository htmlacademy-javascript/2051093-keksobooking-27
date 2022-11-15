const showAlert = (message, timer) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '3px 3px';
  alertContainer.style.fontSize = '15px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, timer);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const getRoomsName = (rooms) => {
  switch (rooms) {
    case 1:
      return 'комната';
    case 2:
    case 3:
    case 4:
      return 'комнаты';
    default:
      return 'комнат';
  }
};

const getGuestsName = (guests) => {
  switch (guests) {
    case 1:
      return 'гостя';
    default:
      return 'гостей';
  }
};

export {getRoomsName, getGuestsName, isEscapeKey, showAlert, debounce};
