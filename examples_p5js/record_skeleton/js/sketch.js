// this example records the tracked bodies feed, 
// i've included commented code to make it easy to record all bodies if desired 
// the all bodies feed would be ideal, for example, 
// if it was important to you to have data for multiple tracked skeletons at the exact same time
// read about the difference between "skeleton" and "all bodies" at https://kinectron.github.io/docs/server2.html#single-frame

// declare kinectron
let kinectron = null;

// declare array to hold recorded data
let frames = [];

function setup() {
  createCanvas(512,424);

  // set background to white
  background(255);

  // define and create an instance of kinectron
  let kinectronIpAddress = "10.0.1.12"; // FILL IN YOUR KINECTRON IP ADDRESS HERE
  kinectron = new Kinectron(kinectronIpAddress);

  // connect with application over peer
  kinectron.makeConnection();

  // set callback for bodies callback
  kinectron.setTrackedBodiesCallback(drawBody);

  // use to record full array of 6 kinect skeletons, tracked or not
  //kinectron.setBodiesCallback(bodyCallback);

}

function keyPressed() {

  // press 8 to start feed
  // press up arrow to start record, down arrow to stop record
  // press enter to stop the feed from running
  
  if (key === '8') {

    // record only tracked skeletons
    kinectron.startTrackedBodies();

    // record full array of 6 kinect skeletons, tracked or not
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


function drawBody(body) {

  background(255);

  //draw each joint in body
  for(var jointType in body.joints) {
    var joint = body.joints[jointType];
    fill(0);
    ellipse(joint.depthX * width, joint.depthY * height, 10, 10);
  }
}

// use this as the callback function to draw the all body array
// function bodyCallback(bodyArray) {  
//   let bodies = bodyArray.bodies;

//   //find tracked bodies, then draw them
//   for (var i = 0; i < bodies.length; i++) {
//     if (bodies[i].tracked === true) {
//       drawBody(bodies[i]);
//     }
//   }
// }