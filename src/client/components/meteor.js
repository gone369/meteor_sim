
import * as PIXI from "pixi.js";
import Meteor from "../assets/MeteorSim/meteor.png";
import gameConfig from "../game.config.js";

export function addMeteorSprite(state){
  console.log("add Meteor");

  const meteor = new PIXI.extras.AnimatedSprite(state.texture.meteor);


  meteor.x = state.canvas.width/2-gameConfig.meteor.width/2;
  meteor.y = 0;
  console.log(meteor.x,meteor.y);
  meteor.animationSpeed = 0.3;
  meteor.play();

  state.sprites.meteor.push(meteor);
  state.stage.addChild(meteor);
}

export function removeMeteorSprite(meteorSprite){
}

export function moveMeteors(meteors){
  for(let meteor of meteors){
    // meteor.x += Math.round(Math.random()) === 1? 2 : -2;
    meteor.x += 0;
    meteor.y -= 1;
  }
}

export default {
  initialize(state){
    state.meteor.addMeteorTimerTick = 100;
    addMeteorSprite(state);
  },
  run(state){
  }
}

//animateMeteorFrame(state.sprites,texture);
// if(state.gameState.numMeteors < 1){
//   addMeteorSprite(state);
// }
