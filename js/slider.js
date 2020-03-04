'use strict';
(function () {
  var START_VALUE = 100;
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
