'use strict';
var MIN_COMMENTS_COUNT = 1;
var MAX_COMMENTS_COUNT = 5;
var MIN_AVATAR_IMG_COUNT = 1;
var MAX_AVATAR_IMG_COUNT = 6;
var MIN_LIKES_COUNT = 15;
var MAX_LIKES_COUNT = 200;
var MIN_PHOTOS_COUNT = 1;
var PHOTOS_COUNT = 25;

// Находит место, куда вставятся фотки
var anotherUserPictures = document.querySelector('.pictures');
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

// Получает случайное число.
var getRandomInteger = function (min, max) {
  var number = min + Math.random() * (max - min);
  return Math.floor(number);
};

var getCommentLayout = function (comment) {
  var imgLayout = '<img class="social__picture" src="' + comment.avatar + '"alt="' + comment.name + '"width="35" height="35"></img>';
  var commentTextLayout = '<p class="social__text">' + comment.message + '</p></li>';
  var commentLayout = '<li class="social__comment">' + imgLayout + commentTextLayout;
  return commentLayout;
};

// Формирует массив из комментариев к фоткам
var getComments = function () {
  var comments = [];
  for (var i = 0; i < getRandomInteger(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT); i++) {
    var comment = {};
    comment['avatar'] = 'img/avatar-' + getRandomInteger(MIN_AVATAR_IMG_COUNT, MAX_AVATAR_IMG_COUNT) + '.svg';
    comment['message'] = messages[getRandomInteger(0, messages.length - 1)];
    comment['name'] = authorNames[getRandomInteger(0, authorNames.length - 1)];
    comment['layout'] = getCommentLayout(comment);
    comments.push(comment);
  }
  return comments;
};

var getAllCommentsLayout = function () {
  var allCommentLayout = '';
  var comments = getComments();
  for (var i = 0; i < comments.length; i++) {
    allCommentLayout += comments[i].layout;
  }
  return allCommentLayout;
};

// Собирает шаблон картинки с данными
var getPicture = function (picture) {
  // клонирует шаблон
  var userPhoto = pictureTemplate.cloneNode(true);

  userPhoto.querySelector('.picture__img').src = picture.url;
  userPhoto.querySelector('.picture__likes').textContent = picture.likes;
  userPhoto.querySelector('.picture__comments').textContent = picture.comments.length;
  return userPhoto;
};

// Находит и отображает блок с полноэкранным показом изображений
var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');
// Заполняет блок данными из объекта photo
var getBigPicture = function (picture) {
  bigPicture.querySelector('.big-picture__img').innerHTML = '<img src="' + picture.url + '" alt="" width="600" height="600">';
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
  bigPicture.querySelector('.social__comments').innerHTML = getAllCommentsLayout();
  bigPicture.querySelector('.social__caption').textContent = '';
  return bigPicture;
};

// Создает фрагмент
var fragment = document.createDocumentFragment();
for (var j = 0; j < PHOTOS_COUNT; j++) {
  var photo = {
    url: 'photos/' + getRandomInteger(MIN_PHOTOS_COUNT, PHOTOS_COUNT) + '.jpg',
    description: '',
    likes: getRandomInteger(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
    comments: getComments()
  };
  fragment.appendChild(getPicture(photo));
  getBigPicture(photo);
}
// добавляет шаблон в отведенное место
anotherUserPictures.appendChild(fragment);

// Прячет блоки счетчиа и загрузки комментов
var commentsCounter = document.querySelector('.social__comment-count');
commentsCounter.classList.add('hidden');
var commentsLoader = document.querySelector('.comments-loader');
commentsLoader.classList.add('hidden');
// Запрещает прокрутку экрана при открытом модальном окне
var body = document.querySelector('body');
body.classList.add('modal-open');
