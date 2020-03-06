'use strict';
(function () {
  var ESC_KEY = 'Escape';

  // Находит и отображает блок с полноэкранным показом изображений
  var bigPicture = document.querySelector('.big-picture');
  var cancelButton = document.querySelector('.big-picture__cancel');
  var body = document.querySelector('body');
  var filter = document.querySelector('.img-filters');
  var onEscPress = function (evt) {
    if (evt.key === ESC_KEY) {
      closePreview();
    }
  };
  var closePreview = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onEscPress);
    filter.addEventListener('click', window.filter.onButtonClick);
    body.classList.remove('modal-open');
  };
  cancelButton.addEventListener('click', function () {
    closePreview();
  });

  window.preview = {
    // Заполняет блок данными из объекта photo
    getBigPicture: function (picture) {
      bigPicture.classList.remove('hidden');
      bigPicture.querySelector('.big-picture__img img').src = picture.url;
      bigPicture.querySelector('.likes-count').textContent = picture.likes;
      bigPicture.querySelector('.social__caption').textContent = '';
      bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
      window.data.allCommentsLayout(picture.comments);
      document.addEventListener('keydown', onEscPress);
    }
  };
})();
