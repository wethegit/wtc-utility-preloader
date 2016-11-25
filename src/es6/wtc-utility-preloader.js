
/**
 * Simple Preloader
 * Simple preloader to load images.
 * Requirements: none
 * Usage:
 * var preloader = new window.wtc.utilities.Preloader();
 * preloader.add('imagename.jpg', 'image');
 *   OR use an ARRAY
 * preloader.add([{file: 'imagename.jpg', type:'image'}, {file: 'imagename.jpg', type:'image'}]);
 * preloader.load(callback);
 */
class Preloader {
  constructor(options) {
    this.options = options;
    this.files = [];
    this.filesLoading = [];
    this.loadCounter = 0;
    this.progress = 0;
    this.callback = function(){};
  }

  add(files) {
    if(typeof files === 'string' || files instanceof String) {
      let type = arguments[1] || 'image';
      this.files.push({
        file: files,
        type:type
      });
    } else {
      //appending files array to this.files array
      this.files.push.apply(this.files, files);
    }
  }
  onFilesLoaded(event,callback) {
    this.loadCounter += 1;
    if(this.loadCounter === this.filesLoading.length) {
      this.callback();
    }
  }

  load(callback) {
    let loaded = 0;
    this.callback = callback;

    for(let num = 0; num < this.files.length; num++) {
      if(!this.files[num].type || this.files[num].type == 'image') {
        let img = new Image();
        img.onload = this.onFilesLoaded.bind(this);
        img.src = this.files[num].file;
        this.filesLoading.push(img);
      }
    }
  }
}

export default Preloader;
