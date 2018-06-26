
import * as PIXI from "pixi.js";
import Meteor from "../assets/MeteorSim/meteor.png";
import gameConfig from "../game.config.js";

export function addMeteorSprite(state){

  const meteorScale = gameConfig.meteor.scale * state.canvas.scale;

  const meteor = new PIXI.extras.AnimatedSprite(state.texture.meteor);
  meteor.x = state.canvas.width/2-gameConfig.meteor.width*meteorScale/2;
  meteor.y = 0;
  meteor.animationSpeed = 0.3;
  meteor.scale.set(meteorScale);
  meteor.play();

  state.sprites.meteor = meteor;
  state.stage.addChild(meteor);
}

export function removeMeteorSprite(state){
  state.stage.removeChild(state.sprites.meteor);
}

export default {
  initialize(state){
    state.meteor.addMeteorTimerTick = 100;
    addMeteorSprite(state);
  },
  moveMeteor(state,deltaX,deltaY){
    const meteorScale = gameConfig.meteor.scale * state.canvas.scale;
    const minX = 0-gameConfig.meteor.width*meteorScale/2;
    const maxX = state.canvas.width-gameConfig.meteor.width*meteorScale/2;
    const minY = 0-gameConfig.meteor.height*meteorScale/2
    const maxY = state.canvas.height-gameConfig.meteor.height*meteorScale-50;

    const finalX = state.sprites.meteor.x + deltaX;
    const finalY = state.sprites.meteor.y + deltaY;

    if(finalX > minX && finalX < maxX){
      state.sprites.meteor.x += deltaX;
    }
    if(finalY > minY && finalY < maxY){
      state.sprites.meteor.y += deltaY;
    }

  },
  stop(){
  },
  destroy(state){
    removeMeteorSprite(state);
  }
}

//animateMeteorFrame(state.sprites,texture);
// if(state.gameState.numMeteors < 1){
//   addMeteorSprite(state);
// }
