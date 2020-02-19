'use strict';
(function () {
  // Находит шаблон
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  window.data = {
    // Получает разметку одного комментария
    getCommentLayout: function (comment) {
      var imgLayout = '<img class="social__picture" src="' + comment.avatar + '"alt="' + comment.name + '"width="35" height="35"></img>';
      var commentTextLayout = '<p class="social__text">' + comment.message + '</p>';
      var commentLayout = '<li class="social__comment">' + imgLayout + commentTextLayout + '</li>';
      return commentLayout;
    },
    // Формирует массив из комментариев к фоткам
    getComments: function (currentComments) {
      var comments = [];
      for (var i = 0; i < currentComments.length; i++) {
        var comment = {};
        comment.avatar = currentComments[i].avatar;
        comment.message = currentComments[i].message;
        comment.name = currentComments[i].name;
        comment.layout = window.data.getCommentLayout(comment);
        comments.push(comment);
      }
      return comments;
    },
    // Получает разметку всех комментариев к фотографии
    getAllCommentsLayout: function (bigPhotoComments) {
      var allCommentLayout = '';
      var comments = window.data.getComments(bigPhotoComments);
      for (var i = 0; i < comments.length; i++) {
        allCommentLayout += comments[i].layout;
      }
      return allCommentLayout;
    },
    // Собирает шаблон картинки с данными
    getPictureTemplate: function (picture) {
      // клонирует шаблон
      var userPhoto = pictureTemplate.cloneNode(true);
      // Заполняет шаблон из объекта
      userPhoto.querySelector('.picture__img').src = picture.url;
      userPhoto.querySelector('.picture__likes').textContent = picture.likes;
      userPhoto.querySelector('.picture__comments').textContent = picture.comments.length;
      userPhoto.querySelector('.picture__img').dataset.id = picture.url;
      return userPhoto;
    }
  };
})();
