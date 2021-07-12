class Drumkit {
    constructor() {
        this.playbtn = document.querySelector(".play");
        this.pads = document.querySelectorAll(".pad");
        this.kickAudio = document.querySelector(".kick-sound");
        this.clapAudio = document.querySelector(".clap-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        this.index = 0;
        this.bpm = 200;
        this.selects = document.querySelectorAll("select");
        this.isPlaying = null;
    }
    activate() {
        this.classList.toggle("active");
    }
    repeat() {
        let step = this.index % 8;
        const activebars = document.querySelectorAll(`.b${step}`);
        activebars.forEach((bar) => {
            bar.style.animation = "playTrack alternate 0.3s ease-in-out 2 ";
            bar.addEventListener("animationend", () => {
                bar.style.animation = "";
            });

            if (bar.classList.contains("active")) {
                if (bar.classList.contains("kick-pad")) {
                    this.kickAudio.currentTime = "0";
                    this.kickAudio.play();
                }
                if (bar.classList.contains("clap-pad")) {
                    this.clapAudio.currentTime = "0";
                    this.clapAudio.play();
                }
                if (bar.classList.contains("hihat-pad")) {
                    this.hihatAudio.currentTime = "0";
                    this.hihatAudio.play();
                }
            }
        });
        console.log(step);
        this.index += 1;
    }
    start() {

        let interval = (60 / this.bpm) * 1000;
        if (!this.isPlaying) {
            this.playbtn.innerText = "Stop";
            this.isPlaying = setInterval(() => {
                this.repeat();
            }, interval);
        } else {
            this.playbtn.innerText = "Play";
            clearInterval(this.isPlaying);
            this.isPlaying = null;
        }
    }
    changeSound(e) {
        const soundName = e.target.name;
        const soundValue = e.target.value;
        switch (soundName) {
            case "kick-select":
                this.kickAudio.src = soundValue;
            case "clap-select":
                this.clapAudio.src = soundValue;
            case "hihat-select":
                this.hihatAudio.src = soundValue;
        }
    }
}
const drum1 = new Drumkit();

drum1.pads.forEach((pad) => {
    pad.addEventListener("click", drum1.activate);
});
drum1.playbtn.addEventListener("click", function () {
    drum1.start();
});
drum1.selects.forEach((select) => {
    select.addEventListener("change",(e)=>{
        drum1.changeSound(e);
    });
});