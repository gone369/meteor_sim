import Meteor from "./meteor.js";
import Rockets from "./rockets.js";
import gameConfig from "../game.config.js";

export function checkMove(state){
  const gameKeyMap = state.gameState.keymap;
  const deltaStep = 2;
  if(gameKeyMap["a"]){
    Meteor.moveMeteor(state,-1*deltaStep,0);
  }
  if(gameKeyMap["w"]){
    Meteor.moveMeteor(state,0,-1*deltaStep);
  }
  if(gameKeyMap["d"]){
    Meteor.moveMeteor(state,deltaStep,0);
  }
  if(gameKeyMap["s"]){
    Meteor.moveMeteor(state,0,deltaStep);
  }
}

export function checkCollision(state){
  const meteor = state.sprites.meteor;
  meteor.hitbox = {
    width: gameConfig.meteor.width*gameConfig.meteor.scale*1/4,
    height: gameConfig.meteor.height*gameConfig.meteor.scale/5,
    x: meteor.x + gameConfig.meteor.width*gameConfig.meteor.scale*3/8,
    y: meteor.y + gameConfig.meteor.height*gameConfig.meteor.scale*7/10
  }

  const rockets = state.sprites.rockets;

  function checkIfMeteorHitRocket(meteor,rocket){
    return meteor.hitbox.x < rocket.hitbox.x + rocket.hitbox.width &&
    meteor.hitbox.x + meteor.hitbox.width > rocket.hitbox.x &&
    meteor.hitbox.y < rocket.hitbox.y + rocket.hitbox.height &&
    meteor.hitbox.height+ meteor.hitbox.y > rocket.hitbox.y;
  }
  return rockets.some(rocket=>{
    rocket.hitbox = {
      width: gameConfig.rocket.width*gameConfig.rocket.scale*1/4,
      height: gameConfig.rocket.height*gameConfig.rocket.scale*4/5,
      x: rocket.x + gameConfig.rocket.width*gameConfig.rocket.scale*3/8,
      y: rocket.y + gameConfig.rocket.height*gameConfig.rocket.scale*1/10
    }
    return checkIfMeteorHitRocket(meteor,rocket);
  });
}
