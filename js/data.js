'use strict';
(function () {
  // Находит шаблон
  var commentsLoader = document.querySelector('.comments-loader');
  var bigPicture = document.querySelector('.big-picture');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var COMMENTS_BLOCK_LENGTH = 5;
  var socialCommentCount = bigPicture.querySelector('.social__comment-count');
  var getCuttedLayouts = function (data) {
    var templates = window.data.getComments(data);
    var layouts = [];
    for (var i = 0; i < templates.length; i++) {
      layouts.push(templates[i].layout);
    }
    return layouts;
  };

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
      var commentsCount = 0;
      var counter = 0;
      var commentLayouts = getCuttedLayouts(bigPhotoComments);
      var getCommentsCounter = function () {
        socialCommentCount.innerHTML = counter + ' из <span class="comments-count">' + commentsCount + '</span> котиков';
      };

      commentsCount = commentLayouts.length;
      var firstBlockOfComments = [];
      var decreasingBlockOfComments = commentLayouts;
      // Если комменариев больше пяти
      if (commentLayouts.length > COMMENTS_BLOCK_LENGTH) {

        commentsLoader.classList.remove('hidden');
        firstBlockOfComments = decreasingBlockOfComments.splice(0, COMMENTS_BLOCK_LENGTH);
        bigPicture.querySelector('.social__comments').innerHTML = firstBlockOfComments;
        counter = COMMENTS_BLOCK_LENGTH;
        getCommentsCounter();
        commentsLoader.addEventListener('click', function () {
          // debugger
          // Если комментариев больше пяти, но меньше десяти
          if (decreasingBlockOfComments.length > COMMENTS_BLOCK_LENGTH) {

            var followingBlockOfComments = decreasingBlockOfComments.splice(0, COMMENTS_BLOCK_LENGTH);
            firstBlockOfComments = firstBlockOfComments.concat(followingBlockOfComments);
            counter += COMMENTS_BLOCK_LENGTH;
            getCommentsCounter();
            bigPicture.querySelector('.social__comments').innerHTML = firstBlockOfComments;

          } else {
            // Если осталось пять и меньше комментариев в последней порции
            var lastBlockOfComments = decreasingBlockOfComments.splice(0, decreasingBlockOfComments.length);
            // debugger
            firstBlockOfComments = firstBlockOfComments.concat(lastBlockOfComments);
            counter = firstBlockOfComments.length;
            getCommentsCounter();
            bigPicture.querySelector('.social__comments').innerHTML = firstBlockOfComments;
            firstBlockOfComments.length = 0;
            commentsLoader.classList.add('hidden');
          }
        });
      } else {
        // Если комментариев пять и меньше изначально
        var singleBlockOfComment = commentLayouts;
        counter = singleBlockOfComment.length;
        commentsCount = singleBlockOfComment.length;
        // getCommentsCounter();
        commentsLoader.classList.add('hidden');
        bigPicture.querySelector('.social__comments').innerHTML = singleBlockOfComment;
      }
      getCommentsCounter();
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
