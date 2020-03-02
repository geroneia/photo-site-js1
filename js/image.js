'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var fileChooser = document.querySelector('#upload-file');
  var uploadPreview = document.querySelector('.img-upload__preview img');

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    // debugger
    window.image = {
      fileName: file.name.toLowerCase()
    };

    var matches = FILE_TYPES.some(function (it) {
      return window.image.fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        uploadPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
