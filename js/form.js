'use strict';
(function () {
  var body = document.querySelector('body');
  var uploadFile = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadCancel = document.querySelector('#upload-cancel');
  var value = uploadFile.value;
  var hashtagsInput = document.querySelector('.text__hashtags');
  var ESC_KEY = 'Escape';
  var onEscPress = function (evt) {
    if (evt.key === ESC_KEY) {
      closeImgUpload();
    }
  };
  var applyEffect = function () {
    // Применяет эффект для изображения
    var effectsRadios = document.querySelectorAll('.effects__radio');
    var effectsPreviews = document.querySelectorAll('.effects__preview');
    var effectsNames = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'];
    var addedEffectClass = 'effects__preview--';
    var imgUploadPreview = document.querySelector('.img-upload__preview img');
    var effectLevelScale = document.querySelector('.img-upload__effect-level');
    var pin = document.querySelector('.effect-level__pin');
    effectLevelScale.classList.add('hidden');
    var START_VALUE = 100;

    var effectLevelValue = document.querySelector('.effect-level__value');
    var getEffectDepth = function (className, currentValue) {
      var stateToEffectDepth = {
        'effects__preview--chrome': 'grayscale(' + 1 / 100 * currentValue + ')',
        'effects__preview--sepia': 'sepia(' + 1 / 100 * currentValue + ')',
        'effects__preview--marvin': 'invert(' + currentValue + '%)',
        'effects__preview--phobos': 'blur(' + 3 / 100 * currentValue + 'px)',
        'effects__preview--heat': 'brightness(' + 3 / 100 * currentValue + ')',
        'effects__preview--none': ''
      };
      return stateToEffectDepth[className];
    };

    // Перебирает псевдомассив превью картинок
    var changeEffect = function (effectPreview, addedClass, effectsRadio) {
      document.addEventListener('click', function (evt) {
        if (evt.target === effectPreview) {
          effectsRadio.checked = true;
          effectLevelScale.classList.toggle('hidden', effectsRadio.value === 'none');
          imgUploadPreview.removeAttribute('class');
          imgUploadPreview.classList.add(addedClass);
          imgUploadPreview.style.filter = getEffectDepth(addedClass, START_VALUE);

          // Описывает изменение насыщенности с помощью бегунка
          pin.addEventListener('mouseup', function () {
            var changedValue = effectLevelValue.value;
            imgUploadPreview.style.filter = getEffectDepth(addedClass, changedValue);
          });
        }
      });
    };
    // Сопоставляет превью-картинку, класс и радио-кнопку
    for (var i = 0; i < effectsPreviews.length; i++) {
      changeEffect(effectsPreviews[i], addedEffectClass + effectsNames[i], effectsRadios[i]);
    }
  };

  // Показывает форму редактироваия изображения
  var openImgUpload = function () {
    imgUploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onEscPress);
    document.addEventListener('focus', function (evt) {
      if (evt.target.className === 'text__hashtags') {
        document.removeEventListener('keydown', onEscPress);
      }
    }, true);
    document.addEventListener('blur', function (evt) {
      if (evt.target.className === 'text__hashtags') {
        document.addEventListener('keydown', onEscPress);
      }
    }, true);
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
})();
