'use strict';
(function () {
  var PHOTOS_COUNT = 25;

  // Находит место, куда вставятся фотки
  var anotherUserPictures = document.querySelector('.pictures');

  // Создает фрагмент и массив для перебора
  var photos = [];
  var renderGallery = function () {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < PHOTOS_COUNT; j++) {
      var miniPhoto = window.data.getPhoto();
      fragment.appendChild(window.data.getPictureTemplate(miniPhoto));
      photos.push(miniPhoto);
    }
    // добавляет шаблон в отведенное место
    anotherUserPictures.appendChild(fragment);
  };
  renderGallery();
  anotherUserPictures.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.className === 'picture__img') {
      var url = target.dataset.id;
      for (var i = 0; i < photos.length; i++) {
        if (photos[i].url === url) {
          window.preview.getBigPicture(photos[i]);
          window.preview.hideComments();
        }
      }
    }
  });
})();
