'use strict';
(function () {
  var PHOTOS_COUNT = 25;
  var ENTER_KEY = 'Enter';

  var onEnterPress = function (evt) {
    if (evt.key === ENTER_KEY) {
      var target = evt.target;
      if (target.classList.contains('picture')) {
        var id = target.querySelector('[data-id]').dataset.id;
        for (var i = 0; i < images.length; i++) {
          if (images[i].url === id) {
            window.preview.getBigPicture(images[i]);
            window.preview.hideComments();
            break;
          }
        }
      }
    }
  };
  // Находит место, куда вставятся фотки
  var anotherUserPictures = document.querySelector('.pictures');
  var images = [];
  var onSuccessLoading = function (photos) {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < PHOTOS_COUNT; j++) {
      var miniPhoto = {
        url: photos[j].url,
        description: '',
        likes: photos[j].likes,
        comments: window.data.getComments(photos[j].comments)
      };
      fragment.appendChild(window.data.getPictureTemplate(miniPhoto));
      images.push(miniPhoto);
    }
    // добавляет шаблон в отведенное место
    anotherUserPictures.appendChild(fragment);
  };

  window.backend.load(onSuccessLoading);

  // Загружает большую фотку при клике на превью
  document.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.classList.contains('picture__img')) {
      var id = target.dataset.id;
      for (var i = 0; i < images.length; i++) {
        if (images[i].url === id) {
          window.preview.getBigPicture(images[i]);
          window.preview.hideComments();
          break;
        }
      }
    }
  });

  document.addEventListener('keydown', onEnterPress);
})();
