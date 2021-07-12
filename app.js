class Drumkit{
    constructor()
    {
        this.playbtn=document.querySelector(".play");
        this.pads=document.querySelectorAll(".pad");
        this.kickAudio=document.querySelector(".kick-sound");
        this.clapAudio=document.querySelector(".clap-sound");
        this.hihatAudio=document.querySelector(".hihat-sound");
        this.index=0;
        this.bpm=100;
    }
    activate()
    {
        this.classList.toggle("active");
    }
    repeat()
    {
        let step=this.index%8;
        const activebars=document.querySelectorAll(`.b${step}`);
        activebars.forEach((bar)=>
        {
            bar.style.animation="playTrack alternate 0.3s ease-in-out 2 ";
            bar.addEventListener("animationend",()=>
            {
                bar.style.animation="";
            });

            if(bar.classList.contains("active"))
            {
                if(bar.classList.contains("kick-pad"))
                {
                    this.kickAudio.currentTime="0";
                    this.kickAudio.play();
                }
                if(bar.classList.contains("clap-pad"))
                {
                    this.clapAudio.currentTime="0";
                    this.clapAudio.play();
                }
                if(bar.classList.contains("hihat-pad"))
                {
                    this.hihatAudio.currentTime="0";
                    this.hihatAudio.play();
                }
            }
        });
        console.log(step);
        this.index+=1;
    }
    start()
    {
        let interval=(60/this.bpm)*1000;
        setInterval(()=>
        {
            this.repeat();
        },interval);
    }
}
const drum1=new Drumkit();

drum1.pads.forEach((pad)=>{
    pad.addEventListener("click",drum1.activate);
});
drum1.playbtn.addEventListener("click",function()
{
    drum1.start();
});