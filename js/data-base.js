const Urls = {
  GET : 'https://27.javascript.pages.academy/keksobooking/data',
  POST : 'https://27.javascript.pages.academy/keksobooking',
};

const requestData = (onSuccess, onError, method, body) => {
  fetch(
    Urls[method],
    {
      method: method,
      body,
    }
  )
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    }).catch(() => {
      onError();
    });
};

export {requestData};
