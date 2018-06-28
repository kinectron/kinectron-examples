let myCanvas = null;

// Declare kinectron
let kinectron = null;

let frameP;

function setup() {
  myCanvas = createCanvas(500, 500);
  background(0);

  frameP = createP('');

  // Define and create an instance of kinectron
  let kinectronIpAddress = ""; // FILL IN YOUR KINECTRON IP ADDRESS HERE
  kinectron = new Kinectron(kinectronIpAddress);

  // Connect to the microstudio
  //kinectron = new Kinectron("kinectron.itp.tsoa.nyu.edu");

  // Connect with application over peer
  kinectron.makeConnection();

  // Set callbacks
  kinectron.setRGBCallback(drawFeed);
  kinectron.setDepthCallback(drawFeed);
  kinectron.setInfraredCallback(drawFeed);
}

function draw() {
  let fps = frameRate();
  fill(0);
  stroke(0);
  text("fps: " + fps.toFixed(0), 10, height);
  frameP.html(fps.toFixed(0));
}

// Choose camera to start based on key pressed
function keyPressed() {
  if (keyCode === ENTER) {
    kinectron.startRGB();
  } else if (keyCode === UP_ARROW) {
    kinectron.startDepth();
  } else if (keyCode === DOWN_ARROW) {
    kinectron.startInfrared();
  } else if (keyCode === RIGHT_ARROW) {
    kinectron.stopAll();
  }
}

function drawFeed(img) {
  // Draws feed using p5 load and display image functions
  loadImage(img.src, function(loadedImage) {
    image(loadedImage, 0, 0);
  });
}
