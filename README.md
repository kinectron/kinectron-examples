# kinectron-examples version 0

**NOTE! These examples are for Version 0. They do not work with Version 1, and are now unmaintained.**

## About

This repository holds examples of Kinectron with [p5.js](https://p5js.org/) and [three.js](https://threejs.org/).

## Dependencies

These examples are dependent of the following libraries:

* [kinectron.bundle.js](https://github.com/kinectron/kinectron) 0.0.5.1
* [p5.js](https://github.com/processing/p5.js) 0.6.1
* [p5.dom.js](https://github.com/processing/p5.js) 0.3.4
* [peer.js](https://github.com/peers/peerjs) 0.3.14
* [three.js](https://github.com/mrdoob/three.js/) r94

## Running the examples

To run the examples, follow these instructions:
* Download this repository or clone it.
* If you downloaded it, unzip it.
* Open your terminal and cd to the folder
* Run a local server, we suggest using Python:

Python2:
```bash
python -m SimpleHTTPServer
```

Python3:
```bash
python3 -m http.server
```

* Finally visit [http://localhost:8000/](http://localhost:8000/) so that your browser opens index.html and runs the example.

## Architecture of examples

### p5.js examples

p5.js examples live in the p5js_examples folder. Each example includes the following files:

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
* __p5.min.js__: p5.js library, lives at "libraries", one folder up.
* __p5.dom.js: p5.dom.js__ library, lives at "libraries", one folder up.
* __kinectron.bundle.js__: Kinectron client library, lives at "libraries", one folder up.
* __recorded_skeleton.js__: recorded Kinectron data, lives at "js", same level.
* __sketch.js__: p5.js sketch, lives at "js", same level.

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

    if (!liveData) {
        initKinectron();
    }

}

function draw() {

}

function initKinectron() {
    kinectron = new Kinectron(kinectronIpAddress)
}

```

Variables:
* __myCanvas__: variable for storing the canvas created with p5.js.
* __kinectron__: variable for storing a Kinectron instance.
* __kinectronIpAddress__: String variable for storing the IP address from the Kinectron server. The format is "X.X.X.X", where X is a number between 0 to 255.
* __liveData__: boolean variable for signaling if the Kinectron data used is live (liveData = true) or is pre-recorded data (liveData = false).

Functions:
* __preload()__: p5.js function, executes first, once. All calls to loading assets, such as images, JSON files, go here.
* __setup()__: p5.js function, executes right after preload(), once. All configuration of initial conditions, such as creating the canvas and assigning callbacks, go here.
* __draw()__: p5.js function, executes right after setup(), on a loop, by default at a maximum speed of 60 times per second. All animation functions that need to be triggered at a specific rate, go here.
* __initKinectron()__: function for initializing a kinectron instance.

### three.js examples

three.js examples live in the threejs_examples folder. Each example includes the following files and folders:

* index.html file
* js/ folder

## Contribute

If you find any problem or have a doubt with any of these examples, please [submit an issue](https://github.com/kinectron/kinectron-examples/issues/new) to this repository.

If you want to contribute an example, please fork this repository and submit a pull request.

## License

MIT
