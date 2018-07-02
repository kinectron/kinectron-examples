let myCanvas = null;
let img;
let myDiv;

// Declare kinectron
let kinectron = null;
// declare IP address, FILL HERE INFO FROM CLIENT
let kinectronIpAddress = "";

// Set to true if using live kinectron data
var liveData = false;

function preload() {

}

function setup() {
  myCanvas = createCanvas(640, 426);
  background(255);
  if (liveData) {
      initKinectron();
    }


}

function draw() {
    if (!liveData) {
        loopRecordedData();
     }
}

function initKinectron() {
  // Define and create an instance of kinectron
  kinectron = new Kinectron(kinectronIpAddress);

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
