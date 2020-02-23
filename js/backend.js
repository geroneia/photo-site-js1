'use strict';
(function () {
  var LOAD_URL = 'https://js.dump.academy/kekstagram/data';
  var UPLOAD_URL = 'https://js.dump.academy/kekstagram';
  var StatusCode = {
    OK: 200
  };
  window.backend = {
    load: function (onLoad) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        onLoad(xhr.response);
      });
      xhr.open('GET', LOAD_URL);
      xhr.send();
    },
    upload: function (data, onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === StatusCode.OK) {
          onSuccess(xhr.response);
        } else {
          onError();
        }
      });

      xhr.open('POST', UPLOAD_URL);
      xhr.send(data);
    }
  };
})();
