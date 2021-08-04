'use strict';
(function () {
  var COMMENTS_BLOCK_LENGTH = 5;
  var commentsLoader = document.querySelector('.comments-loader');
  var bigPicture = document.querySelector('.big-picture');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var socialCommentCount = bigPicture.querySelector('.comments-block-count');
  var commentsList = bigPicture.querySelector('.social__comments');
  var commentSample = document.querySelector('.social__comment');

  // Создает template на основе чернового элемента списака из разметки
  var template = commentSample.cloneNode(true);

  // Заполняет шаблон комментария
  var getCommentLayout = function (comment) {
    var commentLayout = template.cloneNode(true);
    commentLayout.querySelector('.social__picture').src = comment.avatar;
    commentLayout.querySelector('.social__picture').altt = comment.name;
    commentLayout.querySelector('.social__text').textContent = comment.message;

    return commentLayout;
  };

  // Создает фрагмент и помещает его в список комментов
  var appendCommentFragment = function (commentsBlock) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < commentsBlock.length; i++) {
      fragment.appendChild(getCommentLayout(commentsBlock[i]));
    }
    commentsList.appendChild(fragment);
  };

  window.data = {
    // Формирует массив из комментариев к фоткам
    getComments: function (currentComments) {
      var comments = [];
      for (var i = 0; i < currentComments.length; i++) {
        var comment = {};
        comment.avatar = currentComments[i].avatar;
        comment.message = currentComments[i].message;
        comment.name = currentComments[i].name;
        comments.push(comment);
      }
      return comments;
    },
    // Получает разметку всех комментариев к фотографии
    allCommentsLayout: function (bigPhotoComments) {
      commentsList.innerHTML = '';
      var step = 0;
      var counter = 0;
      var firstBlockOfComments = [];
      // Меняет значение счетчика отображенных комментариев
      var getCommentsCounter = function () {
        socialCommentCount.textContent = counter;
      };

      var cuttingComments = function () {
        if (bigPhotoComments.length > step + COMMENTS_BLOCK_LENGTH) {
          var followingBlockOfComments = bigPhotoComments.slice(step, step + COMMENTS_BLOCK_LENGTH);
          appendCommentFragment(followingBlockOfComments);
          counter += COMMENTS_BLOCK_LENGTH;
          getCommentsCounter();
          step += COMMENTS_BLOCK_LENGTH;

        } else {
          var lastBlockOfComments = bigPhotoComments.slice(step, bigPhotoComments.length + 1);
          appendCommentFragment(lastBlockOfComments);
          counter = bigPhotoComments.length;
          getCommentsCounter();
          firstBlockOfComments.length = 0;
          commentsLoader.classList.add('hidden');
          commentsLoader.removeEventListener('click', cuttingComments);
        }
      };

      // Если комментариев больше пяти, отображаются первые пять, показывается кнопка
      if (bigPhotoComments.length > COMMENTS_BLOCK_LENGTH) {
        commentsLoader.classList.remove('hidden');
        firstBlockOfComments = bigPhotoComments.slice(0, COMMENTS_BLOCK_LENGTH);
        appendCommentFragment(firstBlockOfComments);
        counter = COMMENTS_BLOCK_LENGTH;
        getCommentsCounter();
        step = COMMENTS_BLOCK_LENGTH;
        commentsLoader.addEventListener('click', cuttingComments);

      } else {
        var singleBlockOfComment = bigPhotoComments;
        appendCommentFragment(singleBlockOfComment);
        counter = singleBlockOfComment.length;
        commentsLoader.classList.add('hidden');
        getCommentsCounter();
      }
    },

    // Собирает шаблон картинки с данными
    getPictureTemplate: function (picture) {
      var userPhoto = pictureTemplate.cloneNode(true);
      userPhoto.querySelector('.picture__img').src = picture.url;
      userPhoto.querySelector('.picture__likes').textContent = picture.likes;
      userPhoto.querySelector('.picture__comments').textContent = picture.comments.length;
      userPhoto.querySelector('.picture__img').dataset.id = picture.url;
      return userPhoto;
    }
  };
})();
