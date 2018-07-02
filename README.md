# kinectron-examples

## About

This repository holds examples of Kinectron with [p5.js](https://p5js.org/) and [three.js](https://threejs.org/).

## Dependencies

These examples are dependent of the following libraries:

* [kinectron.bundle.js](https://github.com/kinectron/kinectron) 0.0.5.1
* [p5.js](https://github.com/processing/p5.js) 0.6.1
* [p5.dom.js](https://github.com/processing/p5.js) 0.3.4
* [peer.js](https://github.com/peers/peerjs) 0.3.14
* [three.js](https://github.com/mrdoob/three.js/) r94

## Architecture of examples

### p5.js examples

p5.js examples live in a folder which include the following files:

* index.html
* sketch.js
* recorded_skeleton.js

### index.html

```html
<html>
    <head>
        <script src="../libraries/p5.min.js" type="text/javascript"></script>
        <script src="../libraries/p5.dom.js" type="text/javascript"></script>
        <script src="../libraries/kinectron.bundle.js" type="text/javascript"></script>
        <script src="./js/recorded_skeleton.js" type="text/javascript"></script>
        <script src="./js/sketch.js" type="text/javascript"></script>
    </head>
    <body>
    </body>
</html>
```

On the head section, we import the external files for our project:
* p5.min.js: p5.js library, lives at "libraries", one folder up.
* p5.dom.js: p5.dom.js library, lives at "libraries", one folder up.
* kinectron.bundle.js: Kinectron client library, lives at "libraries", one folder up.
* recorded_skeleton.js: recorded Kinectron data, lives at "js", same level.
* sketch.js: p5.js sketch, lives at "js", same level.

### sketch.js

```javascript

//variable for storing the canvas
let myCanvas = null;

//variable for storing the kinectron client
let kinectron = null;

//variable for storing the kinectron server ip address
let kinectronIpAddress = "";

let liveData = false;

function preload() {

}

function setup() {
    //create canvas
    myCanvas = createCanvas(500, 500);
    //white background
    background(255);

}

function draw() {

}

function initKinectron() {
    kinectron = new Kinectron(kinectronIpAddress)
}

```

Variables:
* myCanvas:
* kinectron:
* kinectronIpAddress:
* liveData: boolean for

Functions:
* preload(): p5.js function, executes first, once.
* setup(): p5.js function, executes right after preload(), once.
* draw(): p5.js function, executes right after setup(), on a loop, by default at a maximum speed of 60 times per second.







## Contribute

If you find any problem or have a doubt with any of these examples, please [submit an issue](https://github.com/kinectron/kinectron-examples/issues/new) to this repository.

If you want to contribute an example, please fork this repository and submit a pull request.

## License

MIT
