import * as PIXI from "pixi.js";
import Rockets from "../components/rockets.js";
import Meteor from "../components/meteor.js";
import { checkMove,checkCollision } from "../components/game.js";
import gameConfig from "../game.config.js";
import { forEach,map } from "utils";

export default function run(state){
  function menuKeyHandler(event){
    if(event.key === "s"){
      stopMenu();
    }
  }
  function startMenu(){
    window.addEventListener("keydown",menuKeyHandler);
    state.stage.addChild(state.sprites.menu);
    state.gameState.previous = null;
    state.gameState.current = "menu";
  }
  function runMenu(){
    state.renderer.render(state.stage);
  }
  function stopMenu(){
    state.stage.removeChild(state.sprites.menu);
    window.removeEventListener("keydown",menuKeyHandler);
    state.gameState.current = "startGame";
    state.gameState.previous = "menu";
  }
  function gameKeyHandler(event){
    // console.log(event.key,event.type,this);
    state.gameState.keymap[event.key] = event.type === "keydown";
  }
  function startGame(){
    window.addEventListener("keydown",gameKeyHandler);
    window.addEventListener("keyup",gameKeyHandler);

    state.stage.addChild(state.sprites.backdrop);
    state.stage.addChild(state.sprites.cloud);
    state.gameState.current = "runGame";
    state.gameState.previous = "startGame";

    Rockets.initialize(state);
    Meteor.initialize(state);
  }
  function runGame(){

    state.sprites.backdrop.y -= 1;
    checkMove(state);
    Rockets.run(state);
    const collision = checkCollision(state);
    if(collision){
      console.log("collision!");
    }

    state.renderer.render(state.stage);

    if(state.sprites.backdrop.y < -1*gameConfig.backdrop.height+state.canvas.height*2){
      state.gameState.current = "stopGame";
      state.gameState.previous= "runGame";
    }

  }
  function stopGame(frame){
    //render fade out screen
    //stop rockets

    const $whitescreen = document.querySelector(".whitescreen");
    const start = -1*gameConfig.backdrop.height + state.canvas.height*2;
    const end = -1*gameConfig.backdrop.height + state.canvas.height*1.0;
    const opacity = Math.abs((state.sprites.backdrop.y - start)/(end-start));
    $whitescreen.style.opacity = ""+opacity;

    state.sprites.backdrop.y -= 1;
    checkMove(state);

    Rockets.stop(state);

    state.renderer.render(state.stage);

    if(state.sprites.backdrop.y === -1*gameConfig.backdrop.height + state.canvas.height*1.0){
      state.gameState.current = "runEnd";
      state.gameState.previous= "stopGame";
      state.gameState.stopGameFrame = frame;

      state.stage.removeChild(state.sprites.backdrop);
      state.stage.removeChild(state.sprites.cloud);
      Meteor.destroy(state);
      Rockets.destroy(state);
      window.removeEventListener("keydown",gameKeyHandler);
      window.removeEventListener("keyup",gameKeyHandler);
      window.addEventListener("keydown",endScreenHandler);
      state.stage.addChild(state.sprites.endScreen);
      state.renderer.render(state.stage);
    }

  }
  function endScreenHandler(event){
    if(event.key === "b"){
      stopEnd();
    }
  }
  function runEnd(frame){

    const range = 1000;
    let opacity = 0;

    //fades back into endGame Screen
    if((frame - state.gameState.stopGameFrame) < range){
      opacity = 1 - (frame - state.gameState.stopGameFrame) / range
    }

    const $whitescreen = document.querySelector(".whitescreen");
    $whitescreen.style.opacity = ""+opacity;

  }
  function stopEnd(){
    //reset game
    state.sprites.backdrop.y = 0;

    state.gameState.previous = "end";
    state.gameState.current = "menu";
  }
  function gameLoop(frame){
    switch(state.gameState.current){
      case "menu":
      startMenu(frame);
      runMenu(frame);
      break;
      case "startGame":
      startGame(frame);
      break;
      case "runGame":
      runGame(frame);
      break;
      case "stopGame":
      stopGame(frame);
      break;
      case "runEnd":
      runEnd(frame);
      break;
      case "stopEnd":
      stopEnd(frame);
      break;
      default:
      break;
    }
    requestAnimationFrame(gameLoop);
  }
  gameLoop();
}
