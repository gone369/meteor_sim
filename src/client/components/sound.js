import bgm from "../assets/MeteorSim/bgm.mp3";

export default function(state,cb){
  const $audio = document.createElement("audio");
  $audio.id = "bgm";
  $audio.src=bgm;
  $audio.setAttribute("autoplay","");
  $audio.setAttribute("loop","");

  document.body.appendChild($audio);

  const $soundState = document.getElementById("sound-state");
  $soundState.addEventListener("click",()=>{
    state.sound.muted = !state.sound.muted;
    if(state.sound.muted){ // if is muted
      $soundState.innerHTML= "Play";
      $audio.muted = true;
    } else {
      $soundState.innerHTML= "Mute";
      $audio.muted = false;
    }
  });

  const $loadingMessage= document.getElementById("loading-message");
  const $loadingPercentage = document.getElementById("loading-percentage");
  $loadingMessage.innerHTML = "Loading Sound...";
  $loadingPercentage.innerHTML = "";

  // console.log(bgm);
  // const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  $audio.onloadeddata = function(event){
    $loadingMessage.innerHTML = "Done.";
    cb(null,event);
  }
}
