// thanks to epistemex for starter video to img code https://jsfiddle.net/epistemex/gdp00x2s/

let videoToImages = function (iSrc) {

  return new Promise((resolve, reject) => {

    let i = 0;
    let video = document.createElement('video');
    let images = [];

    video.addEventListener('loadeddata', function() {
      video.currentTime = i;
    }, false);

    video.addEventListener('seeked', function() {
        // now video has seeked and current frames will show
        // at the time as we expect
        this.generateImage(i);

        // when frame is captured, increase
        i++;

        // if we are not passed end, seek to next interval
        if (i <= video.duration) {
          
            // this will trigger another seeked event
            video.currentTime = i;
            console.log('processing');

        } else {

          console.log("finished processing")

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
      let imgData = ctx.getImageData(0,0,video.videoWidth, video.videoHeight);
      let data = imgData.data;
      
      for(let j=0; j<data.length; j+=4) {

        let grayVal = data[j]+ data[j+1] + data[j+2];
        if (grayVal<= 10 || grayVal > 760) data[j+3] = 0 ;
      }

      ctx.putImageData(imgData,0,0);

      let img = new Image();
      img.src = c.toDataURL('image/webp');
      images.push(img);
    }

  });
}
