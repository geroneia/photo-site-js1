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

// Формирует массив из комментариев к фоткам
var getComments = function () {
  var comments = [];
  for (var i = 0; i < getRandomInteger(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT); i++) {
    var comment = {};
    comment['avatar'] = 'img/avatar-' + getRandomInteger(MIN_AVATAR_IMG_COUNT, MAX_AVATAR_IMG_COUNT) + '.svg';
    comment['message'] = messages[getRandomInteger(0, messages.length - 1)];
    comment['name'] = authorNames[getRandomInteger(0, authorNames.length - 1)];
    comments.push(comment);
  }
  return comments;
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
}
// добавляет шаблон в отведенное место
anotherUserPictures.appendChild(fragment);
