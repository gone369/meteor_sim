class Player{
  PImage spriteSheet;
  PImage meteorSprite[][];
  int squareSize=15;
  int ellipseSize = 35;
  int x = 0;
  int pX = 300;
  int pY = 5;
  int y = 0;
  int interval = 45;
  int last = 0;
  int speed = 8;


  Player(){
    spriteSheet=loadImage("meteor.png");
    meteorSprite=new PImage[1][20];
    for (int y = 0; y<1; y++){
      for (int x = 0; x<20; x++){
        meteorSprite[y][x] = spriteSheet.get(x*75,y*200,75,200);
      }
    }
  }
  
  void update(){
    collisionDetect();
    noStroke();
    fill(255,0);
    rectMode(CENTER);
    rect(pX+2, pY+10, squareSize, squareSize);
    image(meteorSprite[y][x],pX-55,pY-230,75*1.5,200*1.5);
    if(animTimer()){
      x++;
      if(x>=20)x=0;
    }
  }
  
  boolean animTimer(){
    if (millis()-last>interval){
      last=millis();
      return true;
    } else {
      return false;
    }
  }
  
  void collisionDetect(){
    for (int b=0; b<rockets.size(); b++){
        Rocket r = rockets.get(b);
      if(r.posY > pY-squareSize-85 && r.posY < pY+squareSize && r.posX > pX-squareSize+10 && r.posX < pX+squareSize+25){
      rockets.remove(b);
      }
    }
  }
  
  void move(){
    if(p1right){
      if (pX+speed<width){
      pX=pX+speed;
      } 
   }
   if (p1left){
    if (pX-speed>0){
      pX=pX-speed;
      } 
   }
   if (p1up){
    if (pY-speed>0){
      pY=pY-speed;
      } 
   }
   if (p1down){
    if (pY+speed<height){
      pY=pY+speed;
      }
    }
  }
}
