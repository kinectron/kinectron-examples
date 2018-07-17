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
  //kinectron.setBodiesCallback(bodyCallback);
  kinectron.setTrackedBodiesCallback(drawBody);

}

function keyPressed() {

  // press 8 to start key feed
  // press up arrow to start record, down arron to stop record
  // press enter to stop the key feed from running
  
  if (key === '8') {
    console.log('k');
    kinectron.startTrackedBodies();
    //kinectron.startBodies();
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

function bodyCallback(bodyArray) {  
  let bodies = bodyArray.bodies;

  //find tracked bodies, then draw them
  for (var i = 0; i < bodies.length; i++) {
    if (bodies[i].tracked === true) {
      drawBody(bodies[i]);
    }
  }
}

// function trackedBodyCallback(body) { 
// debugger;

// }

function drawBody(body) {

  background(255);

  //draw joints in tracked bodies
  for(var jointType in body.joints) {
    var joint = body.joints[jointType];
    fill(0);
    ellipse(joint.depthX * width, joint.depthY * height, 10, 10);
  }
}