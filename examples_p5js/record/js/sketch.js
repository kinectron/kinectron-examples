let kinectron = null;
let frames = [];

function setup() {
  // create p5 canvas
  createCanvas(512,424);

  // set background to white
  background(255);

  // define and create an instance of kinectron
  let kinectronIpAddress = "10.0.1.12"; // FILL IN YOUR KINECTRON IP ADDRESS HERE
  kinectron = new Kinectron(kinectronIpAddress);

  // connect with application over peer
  kinectron.makeConnection();

  // set callback for key frame
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

  // draw key image when it arrives from kinectron 
  loadImage(img.src, function(loadedImage) {
    image(loadedImage, 0,0);
  });
}

