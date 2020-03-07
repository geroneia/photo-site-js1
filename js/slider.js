'use strict';
(function () {
  var START_VALUE = 100;
  var MAXIMUM_PERCENTAGE = 100;
  var MINIMUM_PERCENTAGE = 0;
  var SIMBOLS_AFTER_COMMA_COUNT = 1;
  var effectLevelLine = document.querySelector('.effect-level__line');
  var pin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var imgUploadPreview = document.querySelector('.img-upload__preview img');

  window.slider = {
    // Описывает перемещение бегунка и изменение эффекта
    onMouseDown: function (evt) {
      evt.preventDefault();
      var scale = effectLevelLine.offsetWidth;
      var startCoordX = evt.clientX;

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = startCoordX - moveEvt.clientX;
        startCoordX = moveEvt.clientX;

        var changedValue = ((pin.offsetLeft - shift) * MAXIMUM_PERCENTAGE / scale);
        changedValue = changedValue.toFixed(SIMBOLS_AFTER_COMMA_COUNT);
        if (changedValue > START_VALUE) {
          changedValue = START_VALUE;
        } else if (changedValue < MINIMUM_PERCENTAGE) {
          changedValue = MINIMUM_PERCENTAGE;
        }
        pin.style.left = changedValue + '%';
        effectLevelDepth.style.width = changedValue + '%';
        effectLevelValue.setAttribute('value', changedValue);
        imgUploadPreview.style.filter = window.form.getEffectDepth(window.form.appliedClassName, changedValue);
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  };
})();
