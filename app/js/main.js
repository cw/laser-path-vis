;(function(){

  "use strict";

  $(function(){
    $('#site').html(tmpl.template({ start: 'Start' }));
    // TODO get width and height as percentage of viewport
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
        wm = w * 0.7,
        h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
        hm = h * 0.9,
        s = Snap(wm, hm);
    

    // Check for the various File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      // Great success! All the File APIs are supported.
    } else {
      alert('The File APIs are not fully supported in this browser.');
    }

    // TODO get files per this article http://www.html5rocks.com/en/tutorials/file/dndfiles/
    
  function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
          var span = document.createElement('span');
          span.innerHTML = ['<img class="thumb" src="', e.target.result,
                            '" title="', escape(theFile.name), '"/>'].join('');
          document.getElementById('list').insertBefore(span, null);
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }

  document.getElementById('files').addEventListener('change', handleFileSelect, false);

  });

})();
