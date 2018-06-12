
import * as PIXI from "pixi.js";
import Meteor from "../assets/MeteorSim/meteor.png";
import gameConfig from "../game.config.js";

export function addMeteorSprite(state){
  const meteor = new PIXI.extras.AnimatedSprite(state.texture.meteor);
  meteor.x = state.canvas.width/2-gameConfig.meteor.width/2;
  meteor.y = 0;
  console.log(meteor.x,meteor.y);
  meteor.animationSpeed = 0.3;
  meteor.play();

  state.sprites.meteor = meteor;
  state.stage.addChild(meteor);
}

export function removeMeteorSprite(){
}

export default {
  initialize(state){
    state.meteor.addMeteorTimerTick = 100;
    addMeteorSprite(state);
  },
  moveMeteor(state,deltaX,deltaY){
    const minX = state.sprites.meteor.width;
    const maxX = state.canvas.width-state.sprites.meteor.width;
    const minY = 0
    const maxY = state.canvas.height-state.sprites.meteor.height-50;

    const finalX = state.sprites.meteor.x + deltaX;
    const finalY = state.sprites.meteor.y + deltaY;

    if(finalX > minX && finalX < maxX){
      state.sprites.meteor.x += deltaX;
    }
    if(finalY > minY && finalY < maxY){
      state.sprites.meteor.y += deltaY;
    }

  },
  destroy(state){
    // removeMeteorSprite();
  }
}

//animateMeteorFrame(state.sprites,texture);
// if(state.gameState.numMeteors < 1){
//   addMeteorSprite(state);
// }
