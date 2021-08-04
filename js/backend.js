'use strict';
(function () {
  var LOAD_URL = 'https://javascript.pages.academy/kekstagram/data';
  var UPLOAD_URL = 'https://javascript.pages.academy/kekstagram';
  var METHOD_GET = 'GET';
  var METHOD_POST = 'POST';
  var StatusCode = {
    OK: 200
  };

  var getXhr = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError();
      }
    });
    return xhr;
  };

  var transferData = function (xhr, currentMethod, url, data) {
    xhr.open(currentMethod, url);
    xhr.send(data);
  };

  var load = function (onLoad) {
    var xhr = getXhr(onLoad);
    transferData(xhr, METHOD_GET, LOAD_URL);
  };

  var upload = function (data, onSuccess, onError) {
    var xhr = getXhr(onSuccess, onError);
    transferData(xhr, METHOD_POST, UPLOAD_URL, data);
  };

  window.backend = {
    load: load,
    upload: upload
  };
})();
