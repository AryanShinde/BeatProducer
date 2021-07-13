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
        this.muteBtn = document.querySelectorAll(".mute");
        this.tempo = document.querySelector(".tempo-slider");
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
                break;
            case "clap-select":
                this.clapAudio.src = soundValue;
                break;
            case "hihat-select":
                this.hihatAudio.src = soundValue;
                break;
        }
    }
    mute(e) {
        const target = e.target.getAttribute("data-track");
        e.target.classList.toggle("active");
        if (e.target.classList.contains("active")) {
            switch (target) {
                case "0":
                    this.kickAudio.volume = 0;
                    break;
                case "1":
                    this.clapAudio.volume = 0;
                    break;
                case "2":
                    this.hihatAudio.volume = 0;
                    break;
            }

        } else {
            switch (target) {
                case "0":
                    this.kickAudio.volume = 1;
                    break;
                case "1":
                    this.clapAudio.volume = 1;
                    break;
                case "2":
                    this.hihatAudio.volume = 1;
                    break;
            }

        }
    }
    changeTempo(e) {
        this.bpm = e.target.value;
        const tempoNum = document.querySelector(".no");
        tempoNum.innerText = e.target.value;
    }
    updateTempo(e)
    {
        let interval = (60 / this.bpm) * 1000;
        this.playbtn.innerText = "Play";
        clearInterval(this.isPlaying);
        this.isPlaying=null;
        if(!this.isPlaying)
        {
            this.playbtn.innerText = "Stop";
            this.isPlaying = setInterval(() => {
                this.repeat();
            }, interval);
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
    select.addEventListener("change", (e) => {
        drum1.changeSound(e);
    });
});
drum1.muteBtn.forEach((btn) => {
    btn.addEventListener("click", function (e) {
        drum1.mute(e);
    });
});
drum1.tempo.addEventListener("input", function (e) {
    drum1.changeTempo(e);
});
drum1.tempo.addEventListener("change", function (e) {
    drum1.updateTempo(e);
});