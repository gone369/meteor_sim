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
      document.addEventListener("keydown",menuKeyHandler);
    }
    function runMenu(){
      state.renderer.render(state.stage);
    }
    function stopMenu(){
      state.stage.removeChild(state.sprites.menu);
      document.removeEventListener("keydown",menuKeyHandler);
      state.gameState.current = "startGame";
      state.gameState.previous = "menu";
      gameLoop();
    }
    function gameKeyHandler(event){
      console.log(event.key);
      if(event.key === "a"){
      }
    }
    function startGame(){
      document.addEventListener("keydown",gameKeyHandler);
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
    }
    function runEnd(){
    }
    function stopEnd(){
    }
  }
  gameLoop();
}
