import * as PIXI from "pixi.js";
import Rockets from "../assets/MeteorSim/rocket.png";
import gameConfig from "../game.config.js";
import shortid from "shortid";

export function addRocketSprite(state){
  console.log("add RocketSprite");

  state.gameState.numRockets++;
  const rocket = new PIXI.extras.AnimatedSprite(state.texture.rockets);

  rocket.x = Math.random()*state.canvas.width+gameConfig.rocket.width/2;
  rocket.y = state.canvas.height+gameConfig.rocket.height;
  rocket.scale.set(0.7);
  rocket.animationSpeed = 0.3;
  rocket.play();

  state.sprites.rockets.push(rocket);
  state.stage.addChild(rocket);
  return shortid.generate();
}

export function removeRocketSprite(rocketSprite){
}

export function animateRocketFrame(sprites,texture){
  for(let sprite of sprites.rockets){
    sprite.frame = (sprite.frame+1)%10;
    sprite.sprite = new PIXI.Sprite(texture.rockets[sprite.frame]);
  }
}

export function moveRockets(rockets){
  for(let rocket of rockets){
    // rocket.x += Math.round(Math.random()) === 1? 2 : -2;
    rocket.x += 0;
    rocket.y -= 1;
  }
}

export default {
  initialize(state){
    state.rockets.addRocketTimerTick = 100;
  },
  run(state){
    // console.log(state.rockets.addRocketTimerTick);
    if(--state.rockets.addRocketTimerTick < 0){
      addRocketSprite(state)
      state.rockets.addRocketTimerTick = 100;
    }
    moveRockets(state.sprites.rockets);
  },
  destroy(){
  }
}

//animateRocketFrame(state.sprites,texture);
// if(state.gameState.numRockets < 1){
//   addRocketSprite(state);
// }
