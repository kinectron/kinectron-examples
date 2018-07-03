// Run with simplehttpserver for image to load properly. http://www.andyjamesdavies.com/blog/javascript/simple-http-server-on-mac-os-x-in-seconds


// Set to true if using live kinectron data
let liveData = false;

// declare IP address, FILL HERE INFO FROM CLIENT
let kinectronIpAddress = "10.0.1.12";

// Declare kinectron
let kinectron = null;

let myCanvas = null;
let beach;
let img;
let myDiv;

let processing = false;

// recorded data variables
let sentTime = Date.now();
let currentFrame = 0;

// an array 
let recordedImgs = [];



function preload() {
  beach = loadImage("./assets/beach.png");
}

function setup() {
  myCanvas = createCanvas(640, 426);
  background(255);

  if (!liveData) {

    videoToImages('./assets/vid_white.webm')
      .then(function(returnedImgs) {
        recordedImgs = returnedImgs;
      });
  }

  if (liveData) initKinectron();

}


function draw() {
  
  // if we're running from recorded video and the recorded images have loaded, loop the recorded images
  if (!liveData && typeof recordedImgs !== 'undefined' && recordedImgs.length > 0) {
    loopRecordedData();
  }
}



function goToBeach(img) {
  loadImage(img.src, function(loadedImage) {

    image(beach, 0, 0);
    image(loadedImage, 0, 0);
  });
}


function initKinectron() {
  // Define and create an instance of kinectron
  kinectron = new Kinectron(kinectronIpAddress);

  // Connect with application over peer
  kinectron.makeConnection();

  // Start the greenscreen camera
  kinectron.startKey(goToBeach);

}

function loopRecordedData() {

  // send data every 20 seconds
  if (Date.now() > sentTime + 40) {
    goToBeach(recordedImgs[currentFrame])
    sentTime = Date.now();

    if (currentFrame < recordedImgs.length-1) {
      currentFrame++;
    } else {
      currentFrame = 0;
    }
  }

}
