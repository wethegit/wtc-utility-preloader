/**
  * Simple preloader
  * This is a simple image preloader.
  *
  * Requirements: none
  * Namespace: window.wtc.utilities
  * Usage:
  * var preloader = new window.wtc.utilities.Preloader();
  * preloader.add('imagename.jpg', 'image');
  *   OR use an ARRAY
  * preloader.add([{file: 'imagename.jpg', type:'image'}, {file: 'imagename.jpg', type:'image'}]);
  * preloader.load(callback);
  *
  * TODO: Improve to accept any type of file and use ajax.
  *
  * @param {[object]}(optional) Options.
 */

window.wtc = window.wtc || {};
window.wtc.utilities = window.wtc.utilities || {};

(function (wtc, utilities) {
  utilities.Preloader = (function() {
    var defaults = {
      root: window.wtc.CONST.DOCROOT + 'assets/'
    };

    function Preloader(options) {
      this.options = utilities.extend(defaults, options);
      this.files = [];
    }

    Preloader.prototype.add = function (files) {
      if (typeof files == "string") {
        var type = arguments[1] || 'image';
        this.files.push({file: files, type: type});
      } else {
        this.files.push.apply(this.files, files);
      }
    };

    Preloader.prototype.load = function(callback) {
      var loaded = 0;
      var files = [];

      var inc = function() {
        loaded+= 1;

        if (loaded == files.length && callback)
          callback();
      };

      for (var num = 0; num < this.files.length; num++) {
        if (!this.files[num].type || this.files[num].type == 'image') {
          files[num] = new Image();
          files[num].onload = inc;
          files[num].src = this.options.root + this.files[num].file;
        }
      }
    };

    return Preloader;
  })();
}(window.wtc, window.wtc.utilities));
