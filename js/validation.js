'use strict';
(function () {
  var hashtagsInput = document.querySelector('.text__hashtags');
  var MIN_HASHTAG_LENGTH = 2;
  var MAX_HASHTAG_LENGTH = 20;
  var MAX_HASHYAG_COUNT = 5;

  // Производит валидацию хэштегов
  // Проверка слов
  var findWrongWord = function (target, tag) {
    if (tag.match(/[^а-яёa-z0-9]+$/i)) {
      target.setCustomValidity(
          'Хэш-тег должен состоять только из букв и чисел'
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

  // Ищет одинаковые теги
  var getDoubles = function (words, target) {
    var results = [];
    for (var i = 0; i < words.length; i++) {
      var firstWord = words[i];
      for (var k = i + 1; k < words.length; k++) {
        var secondWord = words[k];
        if (firstWord.toLowerCase() === secondWord.toLowerCase()) {
          results.push(firstWord);
        }
      }
    }
    if (results) {
      target.setCustomValidity(
          'Один и тот же хэш-тег не может быть использован дважды, даже набранный БОЛЬШИМИ буквами (хэш-теги нечувствительны к регистру)'
      );
    }
  };

  hashtagsInput.addEventListener('input', function (evt) {
    var target = evt.target;
    var tags = target.value.split([' ']);
    tags = tags.filter(function (el) {
      return el !== '';
    });
    if (tags.length > MAX_HASHYAG_COUNT) {
      target.setCustomValidity(
          'Нельзя указать больше ' + MAX_HASHYAG_COUNT + '-ти хэш-тегов'
      );
    }
    getDoubles(tags, target);
    var tag = '';
    for (var i = 0; i < tags.length; i++) {
      tag = tags[i];
      if (tag.charAt(0) !== '#') {
        target.setCustomValidity(
            'Хэш-тег должен начинаться с символа # (решётка)'
        );
      } else {
        tag = tag.slice(1).toLowerCase();
        findWrongWord(target, tag);
      }
    }
  });
})();
