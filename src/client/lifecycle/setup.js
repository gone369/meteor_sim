import * as PIXI from "pixi.js";
import Menu from "../assets/MeteorSim/menu_s.png";
import Rockets from "../assets/MeteorSim/rocket.png";
import Backdrop from "../assets/MeteorSim/backdrop.png";
import Cloud from "../assets/MeteorSim/cloud.png";
import Meteor from "../assets/MeteorSim/meteor.png";
import EndScreen from "../assets/MeteorSim/end.png";
import gameConfig from "../game.config.js";

export default function setup(state){

  state.sprites.menu = new PIXI.Sprite(
    PIXI.loader.resources[Menu].texture
  );
  state.sprites.menu.pivot.set(state.sprites.menu.width/2,state.sprites.menu.height/2);
  state.sprites.menu.x = state.canvas.width/2;
  state.sprites.menu.y = state.canvas.height/2;

  //backdrop
  state.sprites.backdrop = new PIXI.Sprite(
    PIXI.loader.resources[Backdrop].texture
  );
  state.sprites.backdrop.x = 0;
  state.sprites.backdrop.y = 0;

  //end game screen
  state.sprites.endScreen = new PIXI.Sprite(PIXI.loader.resources[EndScreen].texture);

  //Cloud
  state.sprites.cloud = new PIXI.Sprite(
    PIXI.loader.resources[Cloud].texture
  );
  state.sprites.cloud.x = state.sprites.menu.width/2;
  state.sprites.cloud.y = state.sprites.menu.height/2;
  state.sprites.cloud.anchor.x = 0.5;
  state.sprites.cloud.anchor.y = 0.5;
  state.sprites.cloud.zOrder = 997;

  //Rockets
  state.sprites.rockets = [];
  state.texture.rockets = [];
  for(let i = 0; i < gameConfig.rocket.numFrames; i++) {
    const tempTexture = new PIXI.Texture(PIXI.loader.resources[Rockets].texture, new PIXI.Rectangle(i*gameConfig.rocket.width,0,gameConfig.rocket.width,gameConfig.rocket.height));
    state.texture.rockets.push(tempTexture);
  }

  //Meteor
  state.sprites.meteor = [];
  state.texture.meteor = [];
  for(let i = 0; i < gameConfig.meteor.numFrames; i++) {
    const tempTexture = new PIXI.Texture(PIXI.loader.resources[Meteor].texture, new PIXI.Rectangle(i*gameConfig.meteor.width,0,gameConfig.meteor.width,gameConfig.meteor.height));
    state.texture.meteor.push(tempTexture);
  }

}
