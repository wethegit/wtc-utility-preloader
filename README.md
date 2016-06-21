# Preloader
Simple preloader class.

### Requirements:
none

### Namespace:
window.wtc.utilities

### Usage:
```javascript  
var preloader = new window.wtc.utilities.Preloader();
preloader.add('imagename.jpg', 'image');
// OR use an ARRAY
preloader.add([
  {file: 'imagename.jpg', type:'image'},
  {file: 'imagename.jpg', type:'image'}
]);
preloader.load(callback);
```

## TODO
* Improve to accept any type of file and use ajax.
