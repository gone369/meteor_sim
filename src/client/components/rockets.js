import * as PIXI from "pixi.js";

function addRocketSprite(state){
  console.log("add RocketSprite");

  state.gameState.numRockets++;
  console.log(state.texture.rockets[0]);
  const sprite = new PIXI.Sprite(state.texture.rockets[0]);

  // state.sprite.y = 0;
  // state.sprite.x = Math.round(Math.random()*state.canvas.width);

  const rocket = {
    velocity: Math.random()*10+1,
    frame: 0,
    sprite: state.sprite
  };

  state.sprites.rockets.push(rocket);
  state.stage.addChild(rocket.sprite);
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


//animateRocketFrame(state.sprites,texture);
if(state.gameState.numRockets < 1){
  addRocketSprite(state);
}
