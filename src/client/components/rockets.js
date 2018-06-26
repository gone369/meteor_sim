import * as PIXI from "pixi.js";
import Rockets from "../assets/MeteorSim/rocket.png";
import gameConfig from "../game.config.js";
import shortid from "shortid";


export function addRocketSprite(state){
  const rocketScale = gameConfig.rocket.scale * state.canvas.scale;

  state.gameState.numRockets++;
  const rocket = new PIXI.extras.AnimatedSprite(state.texture.rockets);

  rocket.x = Math.random()*state.canvas.width+gameConfig.rocket.width*rocketScale/2;
  rocket.y = state.canvas.height+gameConfig.rocket.height*rocketScale;
  rocket.speed = Math.random()*3.5+0.5;// 0.5 - 4
  rocket.scale.set(rocketScale);
  rocket.animationSpeed = 0.3;
  rocket.play();

  state.sprites.rockets.push(rocket);
  state.stage.addChild(rocket);
  return rocket;
}

export function removeOutOfScreenRockets(state){
  const rocketScale = gameConfig.rocket.scale * state.canvas.scale;
  for(let index in state.sprites.rockets){
    const rocket = state.sprites.rockets[index];
    if(rocket.y < -1*gameConfig.rocket.height*rocketScale){
      state.stage.removeChild(rocket);
      state.sprites.rockets.splice(index,1);
    }
  }
}

export function moveRockets(rockets){
  for(let rocket of rockets){
    // rocket.x += Math.round(Math.random()) === 1? 2 : -2;
    // rocket.x += 0
    rocket.y -= 1*rocket.speed;
  }
}

export function removeRockets(state){
  for(let index in state.sprites.rockets){
    const rocket = state.sprites.rockets[index];
    state.stage.removeChild(rocket);
  }
  state.sprites.rockets = [];
}

export default {
  initialize(state){
    state.rockets.addRocketTimerTick = 100;
  },
  run(state){
    // console.log(state.rockets.addRocketTimerTick);
    if(--state.rockets.addRocketTimerTick < 0){
      addRocketSprite(state);
      state.rockets.addRocketTimerTick = 100;
    }
    moveRockets(state.sprites.rockets);
    removeOutOfScreenRockets(state);
  },
  stop(state){
    moveRockets(state.sprites.rockets);
    removeOutOfScreenRockets(state);
  },
  destroy(state){
    removeRockets(state);
  }
}
