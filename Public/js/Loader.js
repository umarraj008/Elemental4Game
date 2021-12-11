class Loader{
    constructor(imageTotal,audioTotal){

        this.totalImages = imageTotal;
        this.imagesLoaded = 0;
        this.imageLoadingFinished = false;

        this.totalAudio = audioTotal;
        this.audiosLoaded = 0;
        this.audioLoadingFinished = true;

        this.allLoaded = false;
    }

    loadImage(src){
        let img =  new Image();
        img.src = src;
        img.onload = this.imageLoaded();
        return img;
    }

    imageLoaded(){
        console.log("image loaded")
        this.imagesLoaded ++;
        if (this.imagesloaded== this.totalImages){
            this.imageLoadingFinished = true;
            this.loadingComplete();
        }
    }
    loadAudio(src){
        let audio =  new Audio(src);
        audio.onload = this.audioLoaded();
        return Audio;
    }

    audioLoaded(){
        this.audiosLoaded ++;
        if (this.audiosloaded == this.totalAudio){
            this.audioLoadingFinished = true;
            this.loadingComplete();
        }
    }

    loadingComplete(){
        if(this.imageLoadingFinished && this.audioLoadingFinished){
          sceneManager.scene = -1;
          console.log("loading complete");
        }
    }

    
}

