'use strict';
(function () {
  var filter = document.querySelector('.img-filters');
  var buttons = filter.querySelectorAll('.img-filters__button');

  window.filter = {
    showButtons: function () {
      filter.classList.remove('img-filters--inactive');
    },
    onButtonClick: window.debounce(function (evt) {
      var target = evt.target;
      var id = target.getAttribute('id');
      if (target.classList.contains('img-filters__button')) {
        for (var i = 0; i < buttons.length; i++) {
          buttons[i].classList.remove('img-filters__button--active');
        }
        target.classList.add('img-filters__button--active');
      }
      if (id === 'filter-default') {
        window.gallery.renderPhotos(window.gallery.getDefaultPhotos());
      } else if (id === 'filter-random') {
        window.gallery.renderPhotos(window.gallery.getUniqueRandomPhotos());
      } else if (id === 'filter-discussed') {
        window.gallery.renderPhotos(window.gallery.getDiscussedPhoto());
      }
    })
  };
})();
