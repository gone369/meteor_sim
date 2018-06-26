import * as PIXI from "pixi.js";

export default function initialize(state){

  const $root = document.getElementById("root");

  const aspectWidth = window.innerHeight*600/750;
  const aspectHeight = window.innerWidth*750/600;

  let width = Math.min(aspectWidth,600);
  let height = Math.min(window.innerHeight,750);

  if(aspectWidth > window.innerWidth){
    width = window.innerWidth;
    height = aspectHeight;
  }

  state.renderer = PIXI.autoDetectRenderer(width,height, {
    antialias: true,
    transparent: true,
    resolution: 1,
    preserveDrawingBuffer: false
  });
  state.renderer.autoResize = true;

  state.gameState = {
    previous: null,
    current: null,
    numRockets: 0,
    dropHeight: 0,
    keymap: {
      a: false,
      s: false,
      d: false,
      f: false
    }
  };

  state.stopwatch = {
    timers: {},
    start: function(key,time){
      state.stopwatch.timers[key] = time || new Date();
    },
    range: function(key,time){
      return (time || new Date()) - state.stopwatch.timers[key];
    },
    percentage: function(key,time,range){
      const _time = time || new Date();
      const startTime = state.stopwatch.timers[key];
      return 1 - (_time - startTime) / range;
    },
    inversePercentage: function(key,time,range){
      const _time = time || new Date();
      const startTime = state.stopwatch.timers[key];
      return (_time - startTime) / range;
    },
    end: function(key,time){
      return (time || new Date()) - state.stopwatch.timers[key];
      delete state.stopwatch.timers[key]
    }
  }

  state.sound = {
    muted: false
  }

  state.canvas = {
    element: state.renderer.view,
    height: state.renderer.view.height,
    width: state.renderer.view.width,
    scale: state.renderer.view.width/600
  };
  state.canvas.element.id = "root-canvas";

  //Add the canvas to the HTML document
  document.getElementById("canvas-container").appendChild(state.canvas.element);
  //Create a container object called the `stage`
  state.stage = new PIXI.Container();
}
