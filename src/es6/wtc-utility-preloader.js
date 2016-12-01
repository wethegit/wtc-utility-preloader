
/**
 * Simple Preloader
 * Simple preloader to load images using promises or callbacks.
 * Requirements: none
 * Usage:
 * var preloader = new window.wtc.utilities.Preloader();
 * preloader.add('imagename.jpg', 'image');
 *   OR use an ARRAY
 * preloader.add([{file: 'imagename.jpg', type:'image'}, {file: 'imagename.jpg', type:'image'}]);
 * preloader.load(callback);
 */

 class Preloader {
   constructor({debug=false} = {}) {
     let _files = [];
     let _loadCounter = 0;

     this.debug = debug;

     this.filesLoading = [];
     this.callback = function(){};

     this.addFiles = function(file) {
       _files.push(file);
     }
     this.getFiles = function() {
       return _files;
     }

     this.incrementLoadCounter = function() {
       _loadCounter++;
     }
     this.getLoadCounter = function() {
       return _loadCounter;
     }


   }


   /**
    * Add Files to preloader
    *
    * @param  {String or Array} files String filename or Array of File Objects
    */
   add(files) {
     if(typeof files === 'string' || files instanceof String) {
       let type = arguments[1] || 'image';
       this.addFiles({
         file: files,
         type:type
       });
     } else {
       //appending files array to _files array
       files.map(this.addFiles);
     }
   }

   getImageWithPromise(file){
     let that = this;
     return new Promise(function(resolve,reject) {
       let img = new Image();
       img.onload = function(){
         that.incrementLoadCounter();
          if(that.debug) {
            console.log("i'm loaded: " + file.file );
          }
         resolve(file);
       };
       img.onerror = function() {
         if(that.debug) {
           console.log("file not found: " + file.file);
         }
         resolve(file);
       };
       img.src = file.file;
     });
   }

   loadWithPromises(callback) {
     let that = this;
     let f = that.getFiles();
     //create an array of images
     let imagePromises = f.map(this.getImageWithPromise.bind(this));
     //wait until all images are loaded.
     Promise.all(imagePromises).then(function(file){
       callback();
    }).catch(function(err){
       if(that.debug) {
         console.log('there was an error:');
         console.log('Error Message:')
         console.log(err.message);
         console.log('Error Object:')
         console.log(err);
       }
     });
   }

   loadWithCallbacks(callback) {
     let f = this.getFiles();
     for(let num = 0; num < f.length; num++) {
       if(!f[num].type || f[num].type == 'image') {
         let img = new Image();
         img.addEventListener( 'load',this.onFilesLoaded.bind(this,callback),false);
         img.addEventListener( 'error',this.onFilesLoaded.bind(this,callback),false);
         img.src = f[num].file;
         this.filesLoading.push(img);
       }
     }
   }

   onFilesLoaded(callback) {
     if(this.debug) {
       if(event.type === "load") {
         console.log("i'm loaded: " + event.path[0].src);
       } else {
         console.log("file not found: " + event.path[0].src);
       }

     }
     this.incrementLoadCounter();
     if(this.getLoadCounter() === this.filesLoading.length && callback) {
       callback();
     }
   }

   /**
    * Trigger preloader to load assets. Call callback function when complete.
    *
    * @param  {function} callback - Callback function
    */
   load(callback) {
     if (window.Promise) {
       this.loadWithPromises(callback);
     } else {
       this.loadWithCallbacks(callback);
     }
   }
 }


 export default Preloader;
