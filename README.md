# Preloader
Simple preloader class.

### Requirements:
none

### Options:

```javascript
Preloader(<Object> options)
```
Default options
``` javascript
{
  debug: false //set to true if you want console logs.
}
```

### Usage:
```javascript
//ES6 import
import Preloader from 'wtc-utility-preloader';

//Instanciate new Preloader
let preloader = new Preloader();

//ADD assets
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
