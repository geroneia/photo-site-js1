'use strict';
(function () {
  // Находит и отображает блок с полноэкранным показом изображений
  var bigPicture = document.querySelector('.big-picture');

  // Заполняет блок данными из объекта photo
  var getBigPicture = function (picture) {
    bigPicture.querySelector('.big-picture__img img').src = picture.url;
    bigPicture.querySelector('.likes-count').textContent = picture.likes;
    bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
    bigPicture.querySelector('.social__comments').innerHTML = window.data.getAllCommentsLayout();
    bigPicture.querySelector('.social__caption').textContent = '';
    return bigPicture;
  };
  window.data.applyFragment(getBigPicture);
  // Прячет блоки счетчика и загрузки комментов
  var commentsCounter = document.querySelector('.social__comment-count');
  commentsCounter.classList.add('hidden');
  var commentsLoader = document.querySelector('.comments-loader');
  commentsLoader.classList.add('hidden');

})();
