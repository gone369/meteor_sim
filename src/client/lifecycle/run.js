import * as PIXI from "pixi.js";
import Rockets from "../components/rockets.js";
import Meteor from "../components/meteor.js";
import { checkMove,checkCollision,resetGame } from "../components/game.js";
import gameConfig from "../game.config.js";
import { forEach,map } from "utils";

export default function run(state){
  function menuKeyHandler(event){
    if(event.key === "s"){
      stopMenu();
    }
  }
  function startMenu(frame){
    state.stage.addChild(state.sprites.menu);
    if(state.gameState.previous === "failGame"){
      state.stopwatch.start("redscreenFadeOut",frame);
    }
    state.gameState.current = "runMenu";
  }
  function runMenu(frame){
    if(state.gameState.previous === "failGame"){
      if(state.stopwatch.range("redscreenFadeOut",frame) < 800){
        const opacity = state.stopwatch.percentage("redscreenFadeOut",frame,800);
        const $redscreen = document.querySelector(".redscreen");
        $redscreen.style.opacity = ""+opacity;
      } else {
        window.addEventListener("keydown",menuKeyHandler);
      }
    } else {
      window.addEventListener("keydown",menuKeyHandler);
    }
    state.renderer.render(state.stage);
  }
  function stopMenu(){
    state.stage.removeChild(state.sprites.menu);
    window.removeEventListener("keydown",menuKeyHandler);
    state.gameState.current = "startGame";
    state.gameState.previous = "stopMenu";
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
  function failGame(frame){

    if(state.stopwatch.range("redscreenFadeIn",frame) < 800){
      const opacity = state.stopwatch.inversePercentage("redscreenFadeIn",frame,800);
      const $redscreen = document.querySelector(".redscreen");
      $redscreen.style.opacity = ""+opacity;
    } else {
      resetGame(state);
      state.gameState.current = "menu",
      state.gameState.previous = "failGame";
    }
  }
  function runGame(frame){

    state.sprites.backdrop.y -= 1;
    checkMove(state);
    Rockets.run(state);
    const collision = checkCollision(state);
    if(collision){
      state.stopwatch.start("redscreenFadeIn",frame);
      state.gameState.current = "failGame";
      state.gameState.previous = "runGame";
    }

    state.renderer.render(state.stage);

    if(state.sprites.backdrop.y < -1*gameConfig.backdrop.height*state.canvas.scale+state.canvas.height*2){
      state.stopwatch.start("whitescreen",state.sprites.backdrop.y);
      state.gameState.current = "stopGame";
      state.gameState.previous= "runGame";
    }

  }
  function stopGame(frame){
    //render fade out screen
    //stop rockets

    const start = -1*gameConfig.backdrop.height*state.canvas.scale + state.canvas.height*2;
    const end = -1*gameConfig.backdrop.height*state.canvas.scale + state.canvas.height*1.0;
    const range = end-start;
    const opacity = state.stopwatch.inversePercentage("whitescreen",state.sprites.backdrop.y,range);
    const $whitescreen = document.querySelector(".whitescreen");
    $whitescreen.style.opacity = ""+opacity;

    state.sprites.backdrop.y -= 1;
    checkMove(state);

    Rockets.stop(state);

    state.renderer.render(state.stage);

    if(state.sprites.backdrop.y < end){
      state.gameState.current = "runEnd";
      state.gameState.previous= "stopGame";
      state.stopwatch.start("stopGame",frame);

      window.removeEventListener("keydown",gameKeyHandler);
      window.removeEventListener("keyup",gameKeyHandler);

      state.stage.removeChild(state.sprites.backdrop);
      state.stage.removeChild(state.sprites.cloud);
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
    if(state.stopwatch.range("stopGame",frame) < range){
      opacity = state.stopwatch.percentage("stopGame",frame,range);
    } else {
      window.addEventListener("keydown",endScreenHandler);
    }

    const $whitescreen = document.querySelector(".whitescreen");
    $whitescreen.style.opacity = ""+opacity;

  }
  function stopEnd(frame){
    //reset game
    resetGame(state);
    window.removeEventListener("keydown",endScreenHandler);

    state.gameState.previous = "end";
    state.gameState.current = "menu";
  }
  function gameLoop(frame){
    switch(state.gameState.current){
      case "startMenu":
      startMenu(frame);
      break;
      case "runMenu":
      runMenu(frame);
      break;
      case "startGame":
      startGame(frame);
      break;
      case "runGame":
      runGame(frame);
      break;
      case "failGame":
      failGame(frame);
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
      startMenu(frame);
      break;
    }
    requestAnimationFrame(gameLoop);
  }
  gameLoop();
}
