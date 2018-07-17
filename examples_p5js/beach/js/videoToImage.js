// thanks to epistemex for starter video to img code https://jsfiddle.net/epistemex/gdp00x2s/

let videoToImages = function (iSrc) {

  return new Promise((resolve, reject) => {

    let frameCtr = 0;
    let images = [];
    let processing = true;
    let video = document.createElement('video');
    let alertDiv = document.createElement('div');

    // Use to show video during processing
    // document.body.appendChild(video);

    // Alert user that something is happening in the background
    alertDiv.innerHTML = `Your recorded Kinectron video is processing.<br> 
      This may take a while. If it is taking too long, try using a shorter video.<br>
      We recommend a video that's less than 10 seconds. <br>
      ps. if you have adblock installed (even if it's paused!) this will not work. Use a browser without it.<br><br>
      <span id="processing">We're currently figuring out how long your video is... stand by... </span>`
      ;

    // Pin alert message to top 
    alertDiv.style.top = '0';
    alertDiv.style.position = 'fixed';
    document.body.appendChild(alertDiv); 

    
    video.addEventListener('loadeddata', function() {
    
      // begin seeking on video load  
      if (video.readyState >= 4) {
        video.currentTime = 0.04;
      }
    
    }, false);

    video.addEventListener('seeked', function() {
        
      // if video is not finished, generate an image at current frame
      if (frameCtr < video.duration) {

        if (isFinite(video.duration)) {
          let processSpan = document.getElementById('processing');
          processSpan.innerHTML = 'Your video is ' + Math.round(video.currentTime/video.duration * 100) + '% processed.'; 
          
        }; 
        
        // this creates an image and will trigger another seeked event  
        if (processing === true ) this.generateImage(frameCtr);      
      
      // if video is finised, remove alert and return images to user
      } else {

        console.log('finished processing');
        processing = false;

        // removes alert
        document.body.removeChild(alertDiv);

        // check that there are images before resolving or rejecting promise
        if ( images.length > -1) {
          resolve(images);
        } else {
          reject("Error");
        } 

      }

    }, false);

    video.preload = "auto";
    video.src = iSrc;

    video.generateImage = function() {
      let c = document.createElement('canvas');
      let ctx = c.getContext('2d');
      
      c.width = this.videoWidth;
      c.height = this.videoHeight;

      ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      
      // get image data from video
      let imgData = ctx.getImageData(0,0,video.videoWidth, video.videoHeight);
      let data = imgData.data;
      
      for(let j=0; j<data.length; j+=4) {

        // remove the background from black or white video
        let grayVal = data[j]+ data[j+1] + data[j+2];
        if (grayVal<= 10 || grayVal > 760) data[j+3] = 0 ;
      
      }

      ctx.putImageData(imgData,0,0);

      let img = new Image();
      img.src = c.toDataURL('image/webp');
      images.push(img);

      // seek to new frame in video, this triggers seek event 
      frameCtr+=0.04;
      video.currentTime = frameCtr
    }

  });
}
