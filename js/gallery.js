'use strict';
(function () {
  var PHOTOS_COUNT = 25;
  var DISCUSSED_PHOTOS_COUNT = 10;
  var ENTER_KEY = 'Enter';
  var filter = document.querySelector('.img-filters');

  // Открывает большую фотку по нажатию на Enter
  var onEnterPress = function (evt) {
    if (evt.key === ENTER_KEY) {
      var target = evt.target;
      if (target.classList.contains('picture')) {
        var id = target.querySelector('[data-id]').dataset.id;
        for (var i = 0; i < images.length; i++) {
          if (images[i].url === id) {
            window.preview.getBigPicture(images[i]);
            filter.removeEventListener('click', window.filter.onButtonClick);
            break;
          }
        }
      }
    }
  };
  // Находит место, куда вставятся фотки
  var anotherUserPictures = document.querySelector('.pictures');

  // Сохраняет данные, полученые с сервера и при работе функции-сборщике фото, для дальнейших изменнений
  var images = [];
  var photos = [];
  var defaultPhotos = [];

  // Собирает шаблон фото
  window.gallery = {
    renderPhotos: function (data) {
      // Убирает загруженные ранее фото
      var pictures = document.querySelectorAll('.picture');
      for (var i = 0; i < pictures.length; i++) {
        pictures[i].remove();
      }
      var fragment = document.createDocumentFragment();
      for (var j = 0; j < data.length; j++) {
        var miniPhoto = {
          url: data[j].url,
          description: '',
          likes: data[j].likes,
          comments: window.data.getComments(data[j].comments)
        };
        fragment.appendChild(window.data.getPictureTemplate(miniPhoto));
        images.push(miniPhoto);
      }
      // добавляет шаблон в отведенное место
      anotherUserPictures.appendChild(fragment);
    },
    // Описывает варианты подборок фотографий по критериям из фильтров
    getDefaultPhotos: function () {
      defaultPhotos = defaultPhotos.slice(0, PHOTOS_COUNT);
      return defaultPhotos;
    },
    getUniqueRandomPhotos: function () {
      var getRandomData = function (data) {
        var j;
        var temp;
        for (var i = data.length - 1; i > 0; i--) {
          j = Math.floor(Math.random() * (i + 1));
          temp = data[j];
          data[j] = data[i];
          data[i] = temp;
        }
        return data;
      };

      var mixedPhotos = getRandomData(photos);
      var uniqueRandomPhotos = mixedPhotos.filter(function (it, i) {
        return mixedPhotos.indexOf(it) === i;
      });
      uniqueRandomPhotos = uniqueRandomPhotos.slice(0, DISCUSSED_PHOTOS_COUNT);
      return uniqueRandomPhotos;
    },
    getDiscussedPhoto: function () {
      var discussedPhoto = photos.sort(function (a, b) {
        return b.likes - a.likes;
      });
      discussedPhoto.slice(0, PHOTOS_COUNT);
      return discussedPhoto;
    }
  };
  // Запускает формирование галереи при успешной загрузке данных
  var onSuccessLoading = function (data) {
    defaultPhotos = data;
    photos = data;
    window.gallery.renderPhotos(window.gallery.getDefaultPhotos());
    window.filter.showButtons();
    filter.addEventListener('click', window.filter.onButtonClick);
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
          filter.removeEventListener('click', window.filter.onButtonClick);
          break;
        }
      }
    }
  });
  document.addEventListener('keydown', onEnterPress);
})();
