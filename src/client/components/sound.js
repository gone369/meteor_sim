import bgm from "../assets/MeteorSim/bgm.mp3";

export default function(state){
  //TODO load sound here
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


  console.log(bgm);
  // const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

}
