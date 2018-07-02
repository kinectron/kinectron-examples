// Run with simplehttpserver for image to load properly. http://www.andyjamesdavies.com/blog/javascript/simple-http-server-on-mac-os-x-in-seconds

let myCanvas = null;
let beach;
let img;
let myDiv;

let processing = false;

// Declare kinectron
let kinectron = null;
// declare IP address, FILL HERE INFO FROM CLIENT

// Set to true if using live kinectron data
var liveData = false;

function preload() {
  beach = loadImage("./assets/beach.png");
}

function setup() {
  myCanvas = createCanvas(640, 426);
  background(255);
  if (liveData) {
      initKinectron();
    }

  // Define an instance of kinectron
  kinectron = new Kinectron(kinectronIpAddress);

  // Start the greenscreen camera
  kinectron.startKey(goToBeach);
}

function draw() {
    if (!liveData) {
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

  // Connect to the ITP microstudio when live
  //kinectron = new Kinectron("kinectron.itp.tsoa.nyu.edu");

  // Connect with application over peer
  kinectron.makeConnection();

}

function loopRecordedData() {

  // send data every 20 seconds
  if (Date.now() > sentTime + 20) {
    bodyTracked(recorded_skeleton[currentFrame])
    sentTime = Date.now();

    if (currentFrame < recorded_skeleton.length-1) {
      currentFrame++;
    } else {
      currentFrame = 0;
    }
  }

}
