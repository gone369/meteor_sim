import * as PIXI from "pixi.js";
import Menu from "../assets/MeteorSim/menu_s.png";
import Rockets from "../assets/MeteorSim/rocket.png";
import Backdrop from "../assets/MeteorSim/backdrop.png";

export default function setup(state){
  //menu background
  state.sprites.menu = new PIXI.Sprite(
    PIXI.loader.resources[Menu].texture
  );
  state.sprites.menu.pivot.set(state.sprites.menu.width/2,state.sprites.menu.height/2);
  state.sprites.menu.x = state.canvas.width/2;
  state.sprites.menu.y = state.canvas.height/2;
  state.stage.addChild(state.sprites.menu);

  //backdrop
  state.sprites.backdrop = new PIXI.Sprite(
    PIXI.loader.resources[Backdrop].texture
  );
  state.sprites.backdrop.x = 0;
  state.sprites.backdrop.y = 0;

  //Rockets
  state.sprites.rockets = [];
  state.texture.rockets = [];
  for(let i = 0; i < 10; i++) {
    const tempTexture = PIXI.utils.TextureCache[Rockets];
    tempTexture.frame = new PIXI.Rectangle(i*100,0,100,250);
    state.texture.rockets.push(tempTexture);
  }
}
