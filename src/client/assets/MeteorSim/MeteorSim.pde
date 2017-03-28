Player myMeteor;
PImage menu, backdrop, meteor, cloud, end;
boolean p1right = false, p1left = false, p1up = false, p1down= false;
int y;
int frameSnapshot = 0;
int frameSnapshot2 = 0;
int state=0;
int particleNum = 10;
int rocketNum;
int timer;
float fadeInAlpha;
float fadeOutAlpha;
float fadeOutDura = 150;
final int MAIN_MENU = 0;
final int GAME=1;
final int TRANSITION = 2;
final int END = 3;
ArrayList<Particle> particles = new ArrayList<Particle>();
ArrayList<Rocket> rockets = new ArrayList<Rocket>();


import ddf.minim.*;
AudioSnippet bgm;
AudioSnippet menubgm;
AudioSnippet earthquake;
Minim minim;


void setup(){
  size(600,750);
  minim = new Minim(this);
  bgm = minim.loadSnippet("starbound_atlas.mp3");
  menubgm = minim.loadSnippet("starbound_haiku.mp3");
  earthquake = minim.loadSnippet("earthquake.mp3");
  myMeteor = new Player();
  menu=loadImage("menu.png");
  backdrop=loadImage("backdrop.png");
  meteor=loadImage("meteor.png");
  cloud=loadImage("cloud.png");
  end=loadImage("end.png");
  frameRate(60);
  smooth();
}

void draw(){
  switch(state){
    case MAIN_MENU:
    mainMenu();
    break;
    case GAME:
    runGame();
    boolean setOnce = false;
    if (y>5000-height){
      state=2;
      if (!setOnce){
        frameSnapshot2 = frameCount;
        setOnce = true;
      }
    }
    break;
    case TRANSITION:
    runGame();
    fadeIn(255);
    if(frameCount>frameSnapshot2+fadeOutDura){
      state = 3;
      frameSnapshot = frameCount;
      }
    break;
    case END:
    image(end,0,0);
    fadeOut(255);
    earthquake.play();
   if (keyPressed){
     if (key == 'b' || key == 'B'){
       bgm.pause();
       bgm.rewind();
       state = 0;
      }
    }
    break;
  }
}


//FUNCTIONS  FUNCTIONS  FUNCTIONS  FUNCTIONS  FUNCTIONS  FUNCTIONS  FUNCTIONS  FUNCTIONS  FUNCTIONS  


void mainMenu(){
  image(menu,0,0);
  fadeOut(0);
  menubgm.play();
  y=0;
  if (keyPressed){
    if (key == 's' || key == 'S'){
      menubgm.pause();
      state = 1; 
      frameSnapshot = frameCount;
    }
  }
}

void runGame(){
  y=constrain(y,0,backdrop.height-height);
  image(backdrop,0,-y);
  y=frameCount-frameSnapshot;
  //println(y);
  myMeteor.update();
  myMeteor.move();
  bgm.play();
  rocket();
  particle();
}

void particle(){
  for (int a=0; a<particleNum; a++){
    if (particles.size()<particleNum){
      particles.add(new Particle(int(random(width)),int(random(10,40))));
    }
  Particle p = particles.get(a);
  p.fly();
  }
}

void rocket(){
  timer = frameCount-frameSnapshot;
  if (timer > 250){
    rocketNum = 2;
  }
  if (timer > 600){
    rocketNum = 4;
  }
  if (timer > 1220){
    rocketNum = 10;
  }
  if (timer > 2000){
    rocketNum = 13;
  }
  if (timer > 3500){
    rocketNum = 16;
  }
  if (timer > 4300){
    rocketNum = 0;
  }
  for (int b=0; b<rocketNum; b++){
    if (state==1){
      if (rockets.size()<rocketNum){
        rockets.add(new Rocket(int(random(width)),int(random(4,13))));
      }
    }
    Rocket r = rockets.get(b);
    r.fly();
  }
}



void fadeOut(int fColor){
  fadeOutAlpha = 255;
  float fDuration = frameCount-frameSnapshot;
  float fAlpha = fadeOutAlpha*10/fDuration;
  fill(fColor,fAlpha);
  rect(0,0,width,height);
}

void fadeIn(int fColor){
  fadeInAlpha = 0;
  rectMode(CORNER);
  float fDuration = frameCount-frameSnapshot2;
  float fAlpha = fadeInAlpha+fDuration/fadeOutDura*255;
  //println (falpha, "falpha");
  //println (frameSnapshot2, "frameSnapshot");
  //println (frameCount, "framecount");
  fill(fColor,fAlpha);
  rect(0,0,width,height);
}

void keyPressed(){
  switch(key){
    case 'd': p1right = true; break;
    case 'a': p1left = true; break;
    case 'w': p1up = true; break;
    case 's': p1down = true; break;
  }
}
void keyReleased(){
  switch(key){
    case 'd': p1right = false; break;
    case 'a': p1left = false; break;
    case 'w': p1up = false; break;
    case 's': p1down = false; break;
  }
}
