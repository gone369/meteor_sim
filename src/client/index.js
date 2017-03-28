import * as PIXI from "pixi.js";
import "./assets/scss/main.scss";
import Menu from "./assets/MeteorSim/menu_s.png";
import Backdrop from "./assets/MeteorSim/backdrop.png";
import Rockets from "./assets/MeteorSim/rocket.png";
import { PixiSpriteUtil } from "pixiUtils";

(function(){
  let sprites = {};
  let texture = {};
  let {renderer,canvas,stage,state} = initialize();

  //load
  const loadProgressHandler = (loader,resource)=>{
    console.log("load",resource,loader);
  };

  PIXI.loader.add([
    Menu,
    Backdrop,
    Rockets
  ]).on("progress",loadProgressHandler)
  .load(()=>{
    setup();
    run();
  });

  function initialize(){
    const renderer = PIXI.autoDetectRenderer(600, 750, {
      antialias: true, 
      transparent: true, 
      resolution: 1,
      preserveDrawingBuffer: false
    });
    renderer.autoResize = true;

    const state = {
      previous: null,
      current: "menu",
      numRockets: 0,
      dropHeight: 0
    }

    const canvas = {
      element: renderer.view,
      height: renderer.view.height,
      width: renderer.view.width,
    };
    canvas.element.style.border = "1px dashed black";
    canvas.element.id = "root-canvas";

    //Add the canvas to the HTML document
    document.getElementById("root").appendChild(canvas.element);
    //Create a container object called the `stage`
    const stage = new PIXI.Container();
    return {
      renderer,
      canvas,
      stage,
      state
    }
  }


  //setup
  function setup(){
    //menu background
    sprites.menu = new PIXI.Sprite(
      PIXI.loader.resources[Menu].texture
    );
    sprites.menu.pivot.set(sprites.menu.width/2,sprites.menu.height/2);
    sprites.menu.x = canvas.width/2;
    sprites.menu.y = canvas.height/2;
    stage.addChild(sprites.menu);

    //backdrop
    sprites.backdrop = new PIXI.Sprite(
      PIXI.loader.resources[Backdrop].texture
    );
    sprites.backdrop.x = 0;
    sprites.backdrop.y = 0;

    //Rockets
    sprites.rockets = [];
    texture.rockets = [];
    for(let i = 0; i < 10; i++) {
      const tempTexture = PIXI.utils.TextureCache[Rockets];
      tempTexture.frame = new PIXI.Rectangle(i*100,0,100,250);
      texture.rockets.push(tempTexture);
    }
    
    //sprites.menu.pivot.set(sprites.backdrop.width/2,0sprites.backdrop.height/2);
    //sprites.backdrop.x = canvas.width/2;
    //sprites.backdrop.y = canvas.height/2;

    //Tell the `renderer` to `render` the `stage`
  }

  function run(){
    switch(state.current){
      case "menu":
        startMenu();
        runMenu();
      break;
      case "game":
        startGame();
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
      renderer.render(stage);
    }
    function stopMenu(){
      console.log("removing...",sprites.menu);
      stage.removeChild(sprites.menu);
      document.removeEventListener("keydown",menuKeyHandler);
      state.current = "game";
      state.previous = "menu";
      run();
    }
    function gameKeyHandler(event){
      console.log(event.key);
      if(event.key === "a"){
      }
    }
    function startGame(){
      document.addEventListener("keydown",gameKeyHandler);
      stage.addChild(sprites.backdrop);

    }
    function runGame(){
      function addRocketSprite(stage,canvas,state,sprites,texture){
        console.log("add RocketSprite");

        state.numRockets++;
        console.log(texture.rockets[0]);
        const sprite = new PIXI.Sprite(texture.rockets[0]);

        //sprite.y = canvas.height - 250;
        sprite.y = 0;
        sprite.x = Math.round(Math.random()*canvas.width);

        console.log(sprite.x,sprite.y);

        const rocket = {
          velocity: Math.random()*10+1,
          frame: 0,
          sprite
        }

        sprites.rockets.push(rocket);
        stage.addChild(rocket.sprite);
      }

      function removeRocketSprite(rocketSprite){
      }

      function animateRocketFrame(sprites,texture){
        for(let sprite of sprites.rockets){
          sprite.frame = (sprite.frame+1)%10;
          sprite.sprite = new PIXI.Sprite(texture.rockets[sprite.frame]);
        }
      }

      function moveRockets(sprites){
        for(let sprite of sprites.rockets){
          sprite.sprite.y += sprite.velocity;
        }
      }

      sprites.backdrop.y -= 1;

      //animateRocketFrame(sprites,texture);
      if(state.numRockets < 1){
        addRocketSprite(stage,canvas,state,sprites,texture);
      }

      renderer.render(stage);
      requestAnimationFrame(run);

    }
    function stopGame(){
    }
    function runEnd(){
    }
    function stopEnd(){
    }
  }



})();

