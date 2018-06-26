import * as PIXI from "pixi.js";
import "./assets/scss/main.scss";
import Menu from "./assets/MeteorSim/menu_s.png";
import Backdrop from "./assets/MeteorSim/backdrop.png";
import Rockets from "./assets/MeteorSim/rocket.png";
import Meteor from "./assets/MeteorSim/meteor.png";
import Cloud from "./assets/MeteorSim/cloud.png";
import EndScreen from "./assets/MeteorSim/end.png";
import { PixiSpriteUtil } from "pixiUtils";

import initialize from "./lifecycle/initialize.js";
import setup from "./lifecycle/setup.js";
import run from "./lifecycle/run.js";

import sound from "./components/sound.js"

(function(){
  let state = {
    rockets: {},
    meteor: {},
    sprites: {},
    sound: {},
    texture: {},
    renderer: null,
    canvas: null,
    stage: null,
    gameState: {}
  };
  initialize(state);
  const $loadingMessage= document.getElementById("loading-message");
  const $loadingPercentage = document.getElementById("loading-percentage");

  //load
  const loadProgressHandler = (loader,resource)=>{
    // console.log("load",resource,loader);
    // console.log(loader.progress);
    $loadingMessage.innerHTML = "Loading Resources...";
    const percentage = +(loader.progress).toFixed(2);
    $loadingPercentage.innerHTML = percentage+"%";
  };

  PIXI.loader.add([
    Menu,
    Backdrop,
    Rockets,
    Meteor,
    Cloud,
    EndScreen
  ]).on("progress",loadProgressHandler)
  .load(()=>{
    sound(state,(err)=>{
      if(err){
        throw new Error("sound load fail");
      }
      $loadingPercentage.innerHTML = "100%";
      $loadingPercentage.className = "hide";
      setup(state);
      run(state);
    });
  });
})();
