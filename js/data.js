'use strict';
(function () {
  // Находит шаблон
  var commentsLoader = document.querySelector('.comments-loader');
  var bigPicture = document.querySelector('.big-picture');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var commentsBlockLength = 5;

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
    allCommentsLayout: function (bigPhotoComments) {
      bigPicture.querySelector('.social__comments').innerHTML = '';
      var commentLayouts = [];
      var comments = window.data.getComments(bigPhotoComments);
      for (var i = 0; i < comments.length; i++) {
        commentLayouts.push(comments[i].layout);
      }

      if (comments.length <= commentsBlockLength) {
        commentLayouts = commentLayouts.join([]);
        bigPicture.querySelector('.social__comments').innerHTML = commentLayouts;
        commentsLoader.classList.add('hidden');

      } else {
        var firstBlockOfComments = [];
        firstBlockOfComments = commentLayouts.splice(0, commentsBlockLength);
        bigPicture.querySelector('.social__comments').innerHTML = firstBlockOfComments;
        commentsLoader.classList.remove('hidden');
        commentsLoader.addEventListener('click', function () {

          if (commentLayouts.length >= commentsBlockLength) {
            var followingBlockOfComments = commentLayouts.splice(0, commentsBlockLength);
            firstBlockOfComments = firstBlockOfComments.concat(followingBlockOfComments);
            bigPicture.querySelector('.social__comments').innerHTML = firstBlockOfComments;

          } else if (commentLayouts.length < commentsBlockLength || commentLayouts.length > 0) {
            followingBlockOfComments = commentLayouts.splice(0, comments.length);
            firstBlockOfComments = firstBlockOfComments.concat(followingBlockOfComments);
            bigPicture.querySelector('.social__comments').innerHTML = firstBlockOfComments;
            commentsLoader.classList.add('hidden');
          }
        });

      }

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
