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

The index.html file includes the following

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



## Contribute

If you find any problem or have a doubt with any of these examples, please [submit an issue](https://github.com/kinectron/kinectron-examples/issues/new) to this repository.

If you want to contribute an example, please fork this repository and submit a pull request.

## License

MIT
