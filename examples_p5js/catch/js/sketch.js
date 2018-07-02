// Set to true if using live kinectron data
let liveData = false;

// Fill in Kinectron IP Address here ie. "127.16.231.33"
let kinectronIpAddress = ""; 

// p5 canvas
let myCanvas = null;

// declare kinectron
let kinectron = null;

let characterWidth = 250;
let characterHeight = 400;

let backgroundColor = 255;
let ballColor = 150;
let characterColor = 0;

let leftHandState = 0;
let rightHandState = 0;

// **********************************
let handJoint = 23;
let x = 100;
let y = 100;
let xdir = 2;
let ydir = 1;
let caught = false;
// **********************************

let processing = false;

// recorded data variables
let sentTime = Date.now();
let currentFrame = 0;

// Initialized joints array
let joints = [];
for (let a = 0; a < 23; a++) {
  joints[a] = {};
  joints[a].x = 0;
  joints[a].y = 0;
}

function setup() {
  myCanvas = createCanvas(windowWidth, windowHeight - 100);
  background(0);

  if (liveData) initKinectron();
}

function initKinectron() {

  kinectron = new Kinectron(kinectronIpAddress);

  // Connect to the microstudio
  //kinectron = new Kinectron("kinectron.itp.tsoa.nyu.edu");

  // Connect remote to application
  kinectron.makeConnection();

  // Start the tracked bodies feed over API
  kinectron.startTrackedBodies(playCatch);



}

function draw() {

  if (!liveData) loopRecordedData();

}

function loopRecordedData() {
  
  // send data every 20 seconds 
  if (Date.now() > sentTime + 20) {
    playCatch(recorded_skeleton[currentFrame])
    sentTime = Date.now();

    if (currentFrame < recorded_skeleton.length-1) {
      currentFrame++;
    } else {
      currentFrame = 0;
    }
  }

}

// Start and stop game
function keyPressed() {
  if (keyCode === ENTER) {
    kinectron.stopAll();
  } else if (keyCode === UP_ARROW) {
    kinectron.startTrackedBodies();
  }
}


function playCatch(body) {
  background(backgroundColor);

  fill(characterColor);
  ellipseMode(CENTER);

  if (processing === false) {
    processing = true;

    caught = false;

    // Get hand states from the tracked body object
    leftHandState = body.leftHandState;
    rightHandState = body.rightHandState;

    for (var j = 0; j < body.joints.length; j++) {
      // Put joints into array
      joints[j] = {
        x: (body.joints[j].cameraX) * characterWidth / 2 + width / 2,
        y: (body.joints[j].cameraY * -1) * characterHeight / 2 + height / 2 + 50
      };
    }

    // Catch the ball!
    if (dist(joints[handJoint].x, joints[handJoint].y, x, y) < 50) {
      caught = true;
      ballColor = color(random(255), random(255), random(255));
    }

    // Loop through and draw joints
    fill(characterColor);
    for (var d = 0; d < joints.length; d++) {
      ellipse(joints[d].x, joints[d].y, 25, 25);
    }

    // Keep ball moving
    if (!caught) {
      x += xdir * 2;
      y += ydir * 2;
      if (x >= width || x <= 0) xdir *= -1;
      if (y >= height || y <= 0) ydir *= -1;
    }

    // Draw ball
    fill(ballColor);
    ellipse(x, y, 50, 50);
    processing = false;
  }
}
