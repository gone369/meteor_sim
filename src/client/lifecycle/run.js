import * as PIXI from "pixi.js";
import Rockets from "../components/rockets.js";
import Meteor from "../components/meteor.js";

export default function run(state){
  function gameLoop(){
    switch(state.gameState.current){
      case "menu":
      startMenu();
      runMenu();
      break;
      case "startGame":
      startGame();
      break;
      case "runGame":
      runGame();
      break;
      case "stopGame":
      stopGame();
      case "end":
      break;
      default:
      break;
    }

    function menuKeyHandler(event){
      if(event.key === "s"){
        stopMenu();
      }
    }
    function startMenu(){
      window.addEventListener("keydown",menuKeyHandler);
    }
    function runMenu(){
      state.renderer.render(state.stage);
    }
    function stopMenu(){
      state.stage.removeChild(state.sprites.menu);
      window.removeEventListener("keydown",menuKeyHandler);
      state.gameState.current = "startGame";
      state.gameState.previous = "menu";
      gameLoop();
    }

    const gameKeyMap = {};
    function gameKeyHandler(event){
      console.log(event.key,event.type,this);
      const deltaStep = 5;
      gameKeyMap[event.key] = event.type === "down"

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

    function startGame(){
      window.addEventListener("keydown",gameKeyHandler);
      window.addEventListener("keyup",gameKeyHandler);
      console.log("state",state);
      state.stage.addChild(state.sprites.backdrop);
      state.stage.addChild(state.sprites.cloud);
      state.gameState.current = "runGame";
      state.gameState.previous = "startGame";

      Rockets.initialize(state);
      Meteor.initialize(state);

      gameLoop();
    }
    function runGame(){

      //sprite.y = canvas.height - 250;

      state.sprites.backdrop.y -= 1;

      Rockets.run(state);

      //end of run game
      state.renderer.render(state.stage);
      requestAnimationFrame(gameLoop);
    }
    function stopGame(){
      console.log("stopGame");
      window.removeEventListener("keydown",gameKeyHandler);
    }
    function runEnd(){
    }
    function stopEnd(){
    }
  }
  gameLoop();
}
