'use strict';
(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var START_VALUE = 100;
  var SCALE_CHANGE_STEP = 25;
  var MAXIMUM_PERCENTAGE = 100;
  var MAXIMUM_GRAYSCALE_DEPTH = 1;
  var MAXIMUM_SEPIA_DEPTH = 1;
  var MAXIMUM_BLUR_DEPTH = 3;
  var MAXIMUM_BRIGHTNESS_DEPTH = 3;
  var body = document.querySelector('body');
  var main = document.querySelector('main');
  var form = document.querySelector('.img-upload__form');
  var uploadFile = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadCancel = document.querySelector('#upload-cancel');
  var effectsList = document.querySelector('.effects__list');
  var pin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var imgUploadPreview = document.querySelector('.img-upload__preview img');
  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');
  var scaleControlValue = document.querySelector('.scale__control--value');

  // Сбрасывает эффекты при новой загрузке
  var getStartImageParameters = function () {
    scaleControlValue.setAttribute('value', START_VALUE);
    imgUploadPreview.style.transform = getTotalScale(START_VALUE);
    imgUploadPreview.style.filter = '';
    imgUploadPreview.removeAttribute('class');
    imgUploadPreview.classList.add('effects__preview--none');
  };

  window.form = {
    // Сопоставляет класс и эффект
    getEffectDepth: function (className, currentValue) {
      var stateToEffectDepth = {
        'effects__preview--chrome': 'grayscale(' + MAXIMUM_GRAYSCALE_DEPTH / MAXIMUM_PERCENTAGE * currentValue + ')',
        'effects__preview--sepia': 'sepia(' + MAXIMUM_SEPIA_DEPTH / MAXIMUM_PERCENTAGE * currentValue + ')',
        'effects__preview--marvin': 'invert(' + currentValue + '%)',
        'effects__preview--phobos': 'blur(' + MAXIMUM_BLUR_DEPTH / MAXIMUM_PERCENTAGE * currentValue + 'px)',
        'effects__preview--heat': 'brightness(' + MAXIMUM_BRIGHTNESS_DEPTH / MAXIMUM_PERCENTAGE * currentValue + ')',
        'effects__preview--none': ''
      };
      return stateToEffectDepth[className];
    },
    appliedClassName: ''
  };

  // Закрытие по Esc
  var onEscPress = function (evt) {
    if (evt.key === ESC_KEY) {
      closeImgUpload();
    }
  };

  // Меняет масштаб
  var getTotalScale = function (number) {
    var scale = 'scale(' + number / MAXIMUM_PERCENTAGE + ')';
    return scale;
  };

  var changeScale = function (scale) {
    scaleControlValue.setAttribute('value', scale);
    imgUploadPreview.style.transform = getTotalScale(scale);
  };

  var onPlusButtonClick = function () {
    var currentScale = Number(scaleControlValue.getAttribute('value'));
    if (currentScale < START_VALUE) {
      currentScale += SCALE_CHANGE_STEP;
      changeScale(currentScale);
    }
  };

  var onMinusButtonClick = function () {
    var currentScale = Number(scaleControlValue.getAttribute('value'));
    if (currentScale > SCALE_CHANGE_STEP) {
      currentScale -= SCALE_CHANGE_STEP;
      changeScale(currentScale);
    }
  };

  // Применяет эффект для изображения
  var applyEffect = function () {
    var effectsRadios = document.querySelectorAll('.effects__radio');
    var effectsPreviews = document.querySelectorAll('.effects__preview');
    var effectsNames = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'];
    var addedEffectClass = 'effects__preview--';
    var effectLevelScale = document.querySelector('.img-upload__effect-level');
    effectLevelScale.classList.add('hidden');

    // Перебирает псевдомассив превью картинок
    var changeEffect = function (effectPreview, addedClass, effectsRadio) {
      var setFilter = function () {
        effectsRadio.checked = true;
        effectLevelScale.classList.toggle('hidden', effectsRadio.value === 'none');
        imgUploadPreview.removeAttribute('class');
        imgUploadPreview.classList.add(addedClass);
        window.form.appliedClassName = addedClass;
        imgUploadPreview.style.filter = window.form.getEffectDepth(addedClass, START_VALUE);
        pin.style.left = START_VALUE + '%';
        effectLevelDepth.style.width = START_VALUE + '%';
        effectLevelValue.setAttribute('value', START_VALUE);
      };
      var onEffectPreviewClick = function (evt) {
        if (evt.target === effectPreview) {
          setFilter();
        }
        pin.addEventListener('mousedown', window.slider.onMouseDown);
      };

      var onEnterPress = function (evt) {
        if (evt.key === ENTER_KEY) {
          evt.preventDefault();
          var target = evt.target;
          var innerImage = target.nextElementSibling.querySelector('.effects__preview');
          if (innerImage === effectPreview) {
            setFilter();
          }
        }
        pin.addEventListener('mousedown', window.slider.onMouseDown);
      };
      document.addEventListener('click', onEffectPreviewClick);
      effectsList.addEventListener('keydown', onEnterPress, true);
    };

    // Сопоставляет превью-картинку, класс и радио-кнопку
    for (var i = 0; i < effectsPreviews.length; i++) {
      changeEffect(effectsPreviews[i], addedEffectClass + effectsNames[i], effectsRadios[i]);
    }
  };

  // Показывает и убирает форму редактироваия изображения
  var onInputFocus = function (evt) {
    if (evt.target.classList.contains('text__hashtags')) {
      document.removeEventListener('keydown', onEscPress);
    } else if (evt.target.classList.contains('text__description')) {
      document.removeEventListener('keydown', onEscPress);
    }
  };

  var onInputBlur = function (evt) {
    if (evt.target.classList.contains('text__hashtags')) {
      document.addEventListener('keydown', onEscPress);
    } else if (evt.target.classList.contains('text__description')) {
      document.addEventListener('keydown', onEscPress);
    }
  };

  var openImgUpload = function () {
    imgUploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onEscPress);
    document.addEventListener('focus', onInputFocus, true);
    document.addEventListener('blur', onInputBlur, true);
    getStartImageParameters();
    scaleControlSmaller.addEventListener('click', onMinusButtonClick);
    scaleControlBigger.addEventListener('click', onPlusButtonClick);
    document.removeEventListener('click', window.gallery.onPreviewClick);
    document.removeEventListener('keydown', window.gallery.onEnterPress);
    body.classList.add('modal-open');
  };

  var closeImgUpload = function () {
    imgUploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onEscPress);
    document.removeEventListener('focus', onInputFocus, true);
    document.removeEventListener('blur', onInputBlur, true);
    scaleControlSmaller.removeEventListener('click', onMinusButtonClick);
    scaleControlBigger.removeEventListener('click', onPlusButtonClick);
    pin.removeEventListener('mousedown', window.slider.onMouseDown);
    form.reset();
    uploadFile.value = '';
    document.addEventListener('click', window.gallery.onPreviewClick);
    document.addEventListener('keydown', window.gallery.onEnterPress);
    body.classList.remove('modal-open');
  };

  uploadFile.addEventListener('change', function () {
    openImgUpload();
    applyEffect();
  });

  imgUploadCancel.addEventListener('click', function () {
    closeImgUpload();
  });

  // Показывает и убирает сообщение об успехе загрузки
  var showMessageModal = function (message) {
    var template = document.querySelector('#' + message)
      .content
      .querySelector('.' + message);
    var modal = template.cloneNode(true);
    main.insertAdjacentElement('afterbegin', modal);

    var closeModal = function () {
      modal.parentNode.removeChild(modal);
    };

    var onModalEscPress = function (evt) {
      if (evt.key === ESC_KEY) {
        closeModal();
        document.removeEventListener('click', onModalButtonClick);
        document.removeEventListener('keydown', onModalEscPress);
      }
    };

    var onModalButtonClick = function (evt) {
      document.removeEventListener('keydown', onModalEscPress);
      var target = evt.target;
      if (target.classList.contains(message) || target.classList.contains(message + '__button')) {
        closeModal();
        document.removeEventListener('click', onModalButtonClick);
      }
    };

    document.addEventListener('keydown', onModalEscPress);
    document.addEventListener('click', onModalButtonClick);
  };

  var onSuccessLoading = function () {
    showMessageModal('success');
  };

  var onErrorLoading = function () {
    showMessageModal('error');
  };

  // Отправляет форму
  form.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(evt.target), onSuccessLoading, onErrorLoading);
    closeImgUpload();
    evt.preventDefault();
  });
})();
