import * as PIXI from "pixi.js";
import "./assets/scss/main.scss";
import bgm from "./assets/MeteorSim/bgm.mp3";
import Menu from "./assets/MeteorSim/menu_s.png";
import Backdrop from "./assets/MeteorSim/backdrop.png";
import Rockets from "./assets/MeteorSim/rocket.png";
import { PixiSpriteUtil } from "pixiUtils";

import initialize from "./lifecycle/initialize.js";
import setup from "./lifecycle/setup.js";
import run from "./lifecycle/run.js";

(function(){
  let state = {
    sprites: {},
    texture: {},
    renderer: null,
    canvas: null,
    stage: null,
    gameState: {}
  };
  initialize(state);

  //load
  const loadProgressHandler = (loader,resource)=>{
    console.log("load",resource,loader);
  };

  PIXI.loader.add([
    Menu,
    Backdrop,
    Rockets
  ]).on("progress",loadProgressHandler)
  .load(()=>{
    setup(state);
    run(state);
  });
})();
