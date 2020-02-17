'use strict';
(function () {
  var MIN_COMMENTS_COUNT = 1;
  var MAX_COMMENTS_COUNT = 5;
  var MIN_AVATAR_IMG_COUNT = 1;
  var MAX_AVATAR_IMG_COUNT = 6;
  var MIN_LIKES_COUNT = 15;
  var MAX_LIKES_COUNT = 200;
  var MIN_PHOTOS_COUNT = 1;
  var PHOTOS_COUNT = 25;


  // Находит шаблон
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var messages = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?! '
  ];
  var authorNames = ['Талита', 'Сури', 'Кузя', 'Киви', 'Горошина', 'Дара'];
  window.data = {
  // Получает случайное число.
    getRandomInteger: function (min, max) {
      var number = min + Math.random() * (max - min);
      return Math.floor(number);
    },
    getCommentLayout: function (comment) {
      var imgLayout = '<img class="social__picture" src="' + comment.avatar + '"alt="' + comment.name + '"width="35" height="35"></img>';
      var commentTextLayout = '<p class="social__text">' + comment.message + '</p>';
      var commentLayout = '<li class="social__comment">' + imgLayout + commentTextLayout + '</li>';
      return commentLayout;
    },
    // Формирует массив из комментариев к фоткам
    getComments: function () {
      var comments = [];
      for (var i = 0; i < window.data.getRandomInteger(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT); i++) {
        var comment = {};
        comment['avatar'] = 'img/avatar-' + window.data.getRandomInteger(MIN_AVATAR_IMG_COUNT, MAX_AVATAR_IMG_COUNT) + '.svg';
        comment['message'] = messages[window.data.getRandomInteger(0, messages.length - 1)];
        comment['name'] = authorNames[window.data.getRandomInteger(0, authorNames.length - 1)];
        comment['layout'] = window.data.getCommentLayout(comment);
        comments.push(comment);
      }
      return comments;
    },
    getAllCommentsLayout: function () {
      var allCommentLayout = '';
      var comments = window.data.getComments();
      for (var i = 0; i < comments.length; i++) {
        allCommentLayout += comments[i].layout;
      }
      return allCommentLayout;
    },
    // Собирает шаблон картинки с данными
    getPictureTemplate: function (picture) {
    // клонирует шаблон
      var userPhoto = pictureTemplate.cloneNode(true);

      userPhoto.querySelector('.picture__img').src = picture.url;
      userPhoto.querySelector('.picture__likes').textContent = picture.likes;
      userPhoto.querySelector('.picture__comments').textContent = picture.comments.length;
      userPhoto.querySelector('.picture__img').dataset.id = picture.url;
      return userPhoto;
    },

    getPhoto: function () {
      var photo = {
        url: 'photos/' + window.data.getRandomInteger(MIN_PHOTOS_COUNT, PHOTOS_COUNT) + '.jpg',
        description: '',
        likes: window.data.getRandomInteger(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
        comments: window.data.getComments()
      };
      return photo;
    }
  };
})();
