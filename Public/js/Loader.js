class Loader{ 
    constructor(imageTotal, audioTotal) {
        this.totalImages = imageTotal;
        this.imagesLoaded = 0;
        this.imageLoadingFinished = false;
      
        this.totalAudio = audioTotal;
        this.audiosLoaded = 0;
        this.audioLoadingFinished = false;
    }
  
    loadImage(src) {
        let img = new Image();
        img.src = src;
        img.onload = function() {loader.imageLoaded();};
        
        return img;
    }
  
    imageLoaded() {
        this.imagesLoaded++;
        if (this.imagesLoaded == this.totalImages) {
          this.imageLoadingFinished = true;
          console.log("Finished Loading Images");
          this.loadingComplete();
        }
    }
    
    loadAudio(src) {
        let audio = new Audio(src);
        audio.onload = this.audioLoaded();
        return audio;
    }
    
    audioLoaded() {
        this.audiosLoaded++;
        if (this.audiosLoaded == this.totalAudio) {
          this.audioLoadingFinished = true;
          console.log("Finished Loading Audios");
          this.loadingComplete();
        }
    }
    
    loadingComplete() {
        if (this.imageLoadingFinished && this.audioLoadingFinished) {
            console.log("Finished Loading");
            sceneManager.scene = -1
            document.getElementById("loginContainer").style.display = "flex";
        }
    }
}