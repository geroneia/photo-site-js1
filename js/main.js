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
  var commentTextLayout = '<p class="social__text">' + comment.message + '</p>';
  var commentLayout = '<li class="social__comment">' + imgLayout + commentTextLayout + '</li>';
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
// bigPicture.classList.remove('hidden');
// Заполняет блок данными из объекта photo
var getBigPicture = function (picture) {
  bigPicture.querySelector('.big-picture__img img').src = picture.url;
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
// body.classList.add('modal-open');

var applyEffect = function () {
  // Применяет эффект для изображения
// Находит радио-кнопки
  var effectsRadios = document.querySelectorAll('.effects__radio');
  // Находит превью картинки
  var effectsPreviews = document.querySelectorAll('.effects__preview');
  // Создает названия классов, которые применятся к картинке
  var effectsNames = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'];
  var addedEffectClass = 'effects__preview--';
  // Находит картинку, к которой нужно применить эффект
  var imgUploadPreview = document.querySelector('.img-upload__preview img');
  // Находит слайдер
  var effectLevelScale = document.querySelector('.img-upload__effect-level');
  // Находит пин
  var pin = document.querySelector('.effect-level__pin');
  effectLevelScale.classList.add('hidden');
  var START_VALUE = 100;

  // Описывает изменение насыщенности с помощью бегунка
  var effectLevelValue = document.querySelector('.effect-level__value');

  var applyEffectDepth = function (value) {
    if (imgUploadPreview.classList.contains('effects__preview--chrome')) {
      imgUploadPreview.style.filter = 'grayscale(' + 1 / 100 * value + ')';
    } else if (imgUploadPreview.classList.contains('effects__preview--sepia')) {
      imgUploadPreview.style.filter = 'sepia(' + 1 / 100 * value + ')';
    } else if (imgUploadPreview.classList.contains('effects__preview--marvin')) {
      imgUploadPreview.style.filter = 'invert(' + value + '%)';
    } else if (imgUploadPreview.classList.contains('effects__preview--phobos')) {
      imgUploadPreview.style.filter = 'blur(' + 3 / 100 * value + 'px)';
    } else if (imgUploadPreview.classList.contains('effects__preview--heat')) {
      imgUploadPreview.style.filter = 'brightness(' + 3 / 100 * value + ')';
    } else {
      imgUploadPreview.style.filter = '';
    }
  };
  // Тут будет считаться положение пина и заполняться value, но перетаскивание - это следующая тема, и я пока не делала
  pin.addEventListener('mouseup', function () {
    var changedValue = effectLevelValue.value;
    applyEffectDepth(changedValue);
  });
  // Перебирает псевдомассив превью картинок
  var changeEffect = function (effectPreview, addedClass, effectsRadio) {
    effectPreview.addEventListener('click', function () {
      for (var k = 0; k < effectsRadios.length; k++) {
        if (effectsRadios[k].checked) {
          effectsRadios[k].checked = false;
        }
      }
      effectsRadio.checked = true;
      if (effectsRadio.value !== 'none') {
        effectLevelScale.classList.remove('hidden');
      } else {
        effectLevelScale.classList.add('hidden');
      }
      imgUploadPreview.removeAttribute('class');
      imgUploadPreview.classList.add(addedClass);
      applyEffectDepth(START_VALUE);
    });
  };

  for (var i = 0; i < effectsPreviews.length; i++) {
    changeEffect(effectsPreviews[i], addedEffectClass + effectsNames[i], effectsRadios[i]);
  }
};

// Показывает форму редактироваия изображения
var uploadFile = document.querySelector('#upload-file');
var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var imgUploadCancel = document.querySelector('#upload-cancel');
var value = uploadFile.value;
var hashtagsInput = document.querySelector('.text__hashtags');
var ESC_KEY = 'Escape';
var MIN_HASHTAG_LENGTH = 2;
var MAX_HASHTAG_LENGTH = 20;
var MAX_HASHYAG_COUNT = 5;
var DELIM = ', ';
var onEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    closeImgUpload();
  }
};

var openImgUpload = function () {
  imgUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onEscPress);
  hashtagsInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', onEscPress);
  });
  hashtagsInput.addEventListener('blur', function () {
    document.addEventListener('keydown', onEscPress);
  });
  body.classList.add('modal-open');
};

var closeImgUpload = function () {
  imgUploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onEscPress);
  body.classList.remove('modal-open');
};

uploadFile.addEventListener('change', function () {
  if (value !== uploadFile.value) {
    openImgUpload();
    applyEffect();
  }
});
imgUploadCancel.addEventListener('click', function () {
  closeImgUpload();
});

// Производит валидацию хэштегов
// Проверка слов
var findWrongWord = function (target, tag) {
  if (tag.match(/\W/g)) {
    target.setCustomValidity(
        'Хэш-тег должен состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т.п.), символы пунктуации (тире, дефис, запятая и т.п.), эмодзи и т.д.'
    );
  } else if (tag.length < MIN_HASHTAG_LENGTH) {
    target.setCustomValidity(
        'Минимальная длина хэш-тега ' + MIN_HASHTAG_LENGTH + ' символов, включая решётку'
    );
  } else if (tag.length > MAX_HASHTAG_LENGTH) {
    target.setCustomValidity(
        'Максимальная длина хэш-тега ' + MAX_HASHTAG_LENGTH + ' символов, включая решётку'
    );
  } else {
    target.setCustomValidity('');
  }
};

hashtagsInput.addEventListener('input', function (evt) {
  var target = evt.target;
  var tags = target.value.split([DELIM]);
  if (tags.length > MAX_HASHYAG_COUNT) {
    target.setCustomValidity(
        'Нельзя указать больше ' + MAX_HASHYAG_COUNT + '-ти хэш-тегов'
    );
  }
  var tag = '';
  for (var i = 0; i < tags.length; i++) {
    tag = tags[i];


    var letters = tag.split(['']);
    if (letters[0] !== '#') {
      target.setCustomValidity(
          'Хэш-тег должен начинаеться с символа # (решётка)'
      );
    } else {
      findWrongWord(target, tag);
    }
  }
});
