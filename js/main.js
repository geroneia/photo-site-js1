'use strict';
// Находит место, куда вставятся фотки
var anotherUserPictures = document.querySelector('.pictures');
// Находит шаблон
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var messages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?! '];
var authorNames = ['Талита', 'Сури', 'Кузя', 'Киви', 'Горошина', 'Дара'];
// Получает случайное число. Как сделать так, чтобы числа не повторялись?
var getRandomInteger = function (min, max) {
  var number = min + Math.random() * (max - min);
  return Math.floor(number);
};

// Формирует массив из комментариев к фоткам
var getCommentsArray = function () {
  var commentsArray = [];
  for (var i = 0; i < getRandomInteger(1, 5); i++) {
    var comment = {};
    comment['avatar'] = 'img/avatar-' + getRandomInteger(1, 6) + '.svg';
    comment['message'] = messages[getRandomInteger(0, messages.length - 1)];
    comment['name'] = authorNames[getRandomInteger(0, authorNames.length - 1)];
    commentsArray.push(comment);
  }
  return commentsArray;
};
// console.log(getCommentsArray());

var photos = [
  {
    url: 'photos/' + getRandomInteger(1, 25) + '.jpg',
    description: '',
    likes: getRandomInteger(15, 200),
    comments: getCommentsArray()
  },
  {
    url: 'photos/' + getRandomInteger(1, 25) + '.jpg',
    description: '',
    likes: getRandomInteger(15, 200),
    comments: getCommentsArray()
  },
  {
    url: 'photos/' + getRandomInteger(1, 25) + '.jpg',
    description: '',
    likes: getRandomInteger(15, 200),
    comments: getCommentsArray()
  },
  {
    url: 'photos/' + getRandomInteger(1, 25) + '.jpg',
    description: '',
    likes: getRandomInteger(15, 200),
    comments: getCommentsArray()
  },
  {
    url: 'photos/' + getRandomInteger(1, 25) + '.jpg',
    description: '',
    likes: getRandomInteger(15, 200),
    comments: getCommentsArray()
  },
  {
    url: 'photos/' + getRandomInteger(1, 25) + '.jpg',
    description: '',
    likes: getRandomInteger(15, 200),
    comments: getCommentsArray()
  },
  {
    url: 'photos/' + getRandomInteger(1, 25) + '.jpg',
    description: '',
    likes: getRandomInteger(15, 200),
    comments: getCommentsArray()
  },
  {
    url: 'photos/' + getRandomInteger(1, 25) + '.jpg',
    description: '',
    likes: getRandomInteger(15, 200),
    comments: getCommentsArray()
  },
  {
    url: 'photos/' + getRandomInteger(1, 25) + '.jpg',
    description: '',
    likes: getRandomInteger(15, 200),
    comments: getCommentsArray()
  },
  {
    url: 'photos/' + getRandomInteger(1, 25) + '.jpg',
    description: '',
    likes: getRandomInteger(15, 200),
    comments: getCommentsArray()
  },
  {
    url: 'photos/' + getRandomInteger(1, 25) + '.jpg',
    description: '',
    likes: getRandomInteger(15, 200),
    comments: getCommentsArray()
  },
  {
    url: 'photos/' + getRandomInteger(1, 25) + '.jpg',
    description: '',
    likes: getRandomInteger(15, 200),
    comments: getCommentsArray()
  },
  {
    url: 'photos/' + getRandomInteger(1, 25) + '.jpg',
    description: '',
    likes: getRandomInteger(15, 200),
    comments: getCommentsArray()
  },
  {
    url: 'photos/' + getRandomInteger(1, 25) + '.jpg',
    description: '',
    likes: getRandomInteger(15, 200),
    comments: getCommentsArray()
  },
  {
    url: 'photos/' + getRandomInteger(1, 25) + '.jpg',
    description: '',
    likes: getRandomInteger(15, 200),
    comments: getCommentsArray()
  },
  {
    url: 'photos/' + getRandomInteger(1, 25) + '.jpg',
    description: '',
    likes: getRandomInteger(15, 200),
    comments: getCommentsArray()
  },
  {
    url: 'photos/' + getRandomInteger(1, 25) + '.jpg',
    description: '',
    likes: getRandomInteger(15, 200),
    comments: getCommentsArray()
  },
  {
    url: 'photos/' + getRandomInteger(1, 25) + '.jpg',
    description: '',
    likes: getRandomInteger(15, 200),
    comments: getCommentsArray()
  },
  {
    url: 'photos/' + getRandomInteger(1, 25) + '.jpg',
    description: '',
    likes: getRandomInteger(15, 200),
    comments: getCommentsArray()
  },
  {
    url: 'photos/' + getRandomInteger(1, 25) + '.jpg',
    description: '',
    likes: getRandomInteger(15, 200),
    comments: getCommentsArray()
  },
  {
    url: 'photos/' + getRandomInteger(1, 25) + '.jpg',
    description: '',
    likes: getRandomInteger(15, 200),
    comments: getCommentsArray()
  },
  {
    url: 'photos/' + getRandomInteger(1, 25) + '.jpg',
    description: '',
    likes: getRandomInteger(15, 200),
    comments: getCommentsArray()
  },
  {
    url: 'photos/' + getRandomInteger(1, 25) + '.jpg',
    description: '',
    likes: getRandomInteger(15, 200),
    comments: getCommentsArray()
  },
  {
    url: 'photos/' + getRandomInteger(1, 25) + '.jpg',
    description: '',
    likes: getRandomInteger(15, 200),
    comments: getCommentsArray()
  },
  {
    url: 'photos/' + getRandomInteger(1, 25) + '.jpg',
    description: '',
    likes: getRandomInteger(15, 200),
    comments: getCommentsArray()
  }
];

// здесь я пробовала через функцию делать формирование массива фоток и потом применять ее, но что-то пошло не так
// var getPhotosArray = function () {
//   var photosArray = [];
//   for (var i = 0; i < 25; i++) {
//     var photo = {};
//     photo['url'] = 'photos/' + getRandomInteger(1, 25) + '.jpg';
//     photo['description'] = '';
//     photo['likes'] = getRandomInteger(15, 200);
//     photo['comments'] = getCommentsArray();
//     console.log(photo);
//     photosArray.push(photo);
//   }
//   return photosArray;
// };
// console.log(getPhotosArray());


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
for (var j = 0; j < photos.length; j++) {
  fragment.appendChild(getPicture(photos[j]));
}
// добавляет шаблон в отведенное место
anotherUserPictures.appendChild(fragment);


