let myCanvas = null;
let context = null;
let kinectron = null;
let frames = [];

function setup() {
  myCanvas = createCanvas(512,424);
  context = myCanvas.drawingContext;

  //console.log(myCanvas.drawingContext);
  background(255);

  // Define and create an instance of kinectron
  let kinectronIpAddress = "10.0.1.12"; // FILL IN YOUR KINECTRON IP ADDRESS HERE
  kinectron = new Kinectron(kinectronIpAddress);

  // Connect to the microstudio
  //kinectron = new Kinectron("kinectron.itp.tsoa.nyu.edu");

  // Connect with application over peer
  kinectron.makeConnection();

  // Set individual frame callbacks
  kinectron.setKeyCallback(keyCallback);
  kinectron.setDepthCallback(depthCallback);
  kinectron.setBodiesCallback(bodyCallback);

  // Set frames wanted from Kinectron
  frames = ["color", "depth", "body"];
}

function keyPressed() {
  if (keyCode === ENTER) {
    kinectron.stopAll();
  } else if (keyCode === UP_ARROW) {
    kinectron.startRecord();
  } else if (keyCode === DOWN_ARROW) {
    kinectron.stopRecord();
  } else if (key === '8') {
    console.log('d');
    kinectron.startKey(keyCallback);
  } else if (key === '9') {
    kinectron.stopAll();
  } 

}

function keyCallback(img) {
  loadImage(img.src, function(loadedImage) {
    image(loadedImage, 0,0);
  });
}

function depthCallback(img) {
  loadImage(img.src, function(loadedImage) {
    image(loadedImage,0,0);
  });
}

function bodyCallback(body) {
  //find tracked bodies
  for (var i = 0; i < body.length; i++) {
    if (body[i].tracked === true) {
      bodyTracked(body[i]);
    }
  }
}

function bodyTracked(body) {

  context.fillStyle = '#000000';
  context.fillRect(0, 0, 330, 273.2);

  //draw joints in tracked bodies
  for(var jointType in body.joints) {
    var joint = body.joints[jointType];
    context.fillStyle = '#ff0000';
    context.fillRect(joint.depthX * 330, joint.depthY * 273.2, 10, 10);
  }
}
