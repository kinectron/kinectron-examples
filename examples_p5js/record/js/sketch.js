let myCanvas = null;
let context = null;
let kinectron = null;
let frames = [];

function setup() {
  myCanvas = createCanvas(512,424);
  context = myCanvas.drawingContext;

  // set background to white
  background(255);

  // Define and create an instance of kinectron
  let kinectronIpAddress = "10.0.1.12"; // FILL IN YOUR KINECTRON IP ADDRESS HERE
  kinectron = new Kinectron(kinectronIpAddress);

  // Connect with application over peer
  kinectron.makeConnection();

  // Set callback for Key frame
  kinectron.setKeyCallback(keyCallback);

}

function keyPressed() {

  // press 8 to start key feed
  // press up arrow to start record, down arron to stop record
  // press enter to stop the key feed from running
  
  if (key === '8') {
    kinectron.startKey();
  } else if (keyCode === UP_ARROW) {
    kinectron.startRecord();
  } else if (keyCode === DOWN_ARROW) {
    kinectron.stopRecord();
  } else if (keyCode === ENTER) {
    kinectron.stopAll();
  }
  
}

function keyCallback(img) {
  loadImage(img.src, function(loadedImage) {
    image(loadedImage, 0,0);
  });
}

