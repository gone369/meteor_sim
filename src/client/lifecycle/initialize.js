import * as PIXI from "pixi.js";

export default function initialize(state){

  state.renderer = PIXI.autoDetectRenderer(600, 750, {
    antialias: true,
    transparent: true,
    resolution: 1,
    preserveDrawingBuffer: false
  });
  state.renderer.autoResize = true;

  state.gameState = {
    previous: null,
    current: "menu",
    numRockets: 0,
    dropHeight: 0
  }

  state.canvas = {
    element: state.renderer.view,
    height: state.renderer.view.height,
    width: state.renderer.view.width,
  };
  state.canvas.element.style.border = "1px dashed black";
  state.canvas.element.id = "root-canvas";

  //Add the canvas to the HTML document
  document.getElementById("root").appendChild(state.canvas.element);
  //Create a container object called the `stage`
  state.stage = new PIXI.Container();
}
