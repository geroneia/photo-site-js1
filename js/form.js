'use strict';
(function () {
  var ESC_KEY = 'Escape';
  var START_VALUE = 100;
  var PIN_WIDTH = 18;
  var body = document.querySelector('body');
  var main = document.querySelector('main');
  var form = document.querySelector('.img-upload__form');
  var uploadFile = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadCancel = document.querySelector('#upload-cancel');
  var pin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var value = uploadFile.value;
  var effectLevelLine = document.querySelector('.effect-level__line');
  var imgUploadPreview = document.querySelector('.img-upload__preview img');
  var appliedClassName = '';
  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');
  var scaleControlValue = document.querySelector('.scale__control--value');
  var scaleChangeStep = 25;

  // Закрытие по Esc
  var onEscPress = function (evt) {
    if (evt.key === ESC_KEY) {
      closeImgUpload();
    }
  };

  // Меняет масштаб
  var getTotalScale = function (number) {
    var scale = 'scale(' + number / 100 + ')';
    return scale;
  };

  var onPlusButtonClick = function () {
    var currentScale = Number(scaleControlValue.getAttribute('value'));
    if (currentScale < START_VALUE) {
      currentScale += scaleChangeStep;
      scaleControlValue.setAttribute('value', currentScale);
      imgUploadPreview.style.transform = getTotalScale(currentScale);
    }
  };

  var onMinusButtonClick = function () {
    var currentScale = Number(scaleControlValue.getAttribute('value'));
    if (currentScale > scaleChangeStep) {
      currentScale -= scaleChangeStep;
      scaleControlValue.setAttribute('value', currentScale);
      imgUploadPreview.style.transform = getTotalScale(currentScale);
    }
  };

  var applyEffect = function () {
    // Применяет эффект для изображения
    var effectsRadios = document.querySelectorAll('.effects__radio');
    var effectsPreviews = document.querySelectorAll('.effects__preview');
    var effectsNames = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'];
    var addedEffectClass = 'effects__preview--';
    var effectLevelScale = document.querySelector('.img-upload__effect-level');
    effectLevelScale.classList.add('hidden');

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
    // Описывает перемещение бегунка и изменение эффекта
    var onMouseDown = function (evt) {
      evt.preventDefault();
      var scale = effectLevelLine.offsetWidth;
      var minX = effectLevelLine.getBoundingClientRect().x + PIN_WIDTH / 2;
      var maxX = minX + scale - PIN_WIDTH;
      var startCoordX = evt.clientX;

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        if (moveEvt.clientX >= minX && moveEvt.clientX <= maxX) {
          var shift = startCoordX - moveEvt.clientX;
          startCoordX = moveEvt.clientX;

          var changedValue = ((pin.offsetLeft - shift) * 100 / scale);
          changedValue = changedValue.toFixed(1);
          if (changedValue > START_VALUE) {
            changedValue = START_VALUE;
          } else if (changedValue < 0) {
            changedValue = 0;
          }
          pin.style.left = changedValue + '%';
          effectLevelDepth.style.width = changedValue + '%';
          effectLevelValue.setAttribute('value', changedValue);
          imgUploadPreview.style.filter = getEffectDepth(appliedClassName, changedValue);
        }
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    // Перебирает псевдомассив превью картинок
    var changeEffect = function (effectPreview, addedClass, effectsRadio) {
      document.addEventListener('click', function (evt) {
        if (evt.target === effectPreview) {
          pin.removeEventListener('mousedown', onMouseDown);
          effectsRadio.checked = true;
          effectLevelScale.classList.toggle('hidden', effectsRadio.value === 'none');
          imgUploadPreview.removeAttribute('class');
          imgUploadPreview.classList.add(addedClass);
          appliedClassName = addedClass;
          imgUploadPreview.style.filter = getEffectDepth(addedClass, START_VALUE);
          pin.style.left = START_VALUE + '%';
          effectLevelDepth.style.width = START_VALUE + '%';
          effectLevelValue.setAttribute('value', START_VALUE);
          pin.addEventListener('mousedown', onMouseDown);
        }
      });
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
    scaleControlValue.setAttribute('value', START_VALUE);
    imgUploadPreview.style.transform = getTotalScale(START_VALUE);
    scaleControlSmaller.addEventListener('click', onMinusButtonClick);
    scaleControlBigger.addEventListener('click', onPlusButtonClick);
    body.classList.add('modal-open');
  };

  var closeImgUpload = function () {
    imgUploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onEscPress);
    document.removeEventListener('focus', onInputFocus, true);
    document.removeEventListener('blur', onInputBlur, true);
    scaleControlSmaller.removeEventListener('click', onMinusButtonClick);
    scaleControlBigger.removeEventListener('click', onPlusButtonClick);
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
      }
    };
    document.addEventListener('keydown', onModalEscPress);
    document.addEventListener('click', function (evt) {
      document.removeEventListener('keydown', onModalEscPress);
      var target = evt.target;
      if (target.classList.contains(message)) {
        closeModal();
      } else if (target.classList.contains(message + '__button')) {
        closeModal();
      }
    });
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
    form.reset();
    evt.preventDefault();
  });
})();
