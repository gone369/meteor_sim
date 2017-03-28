class Rocket{
  PImage spriteSheet;
  PImage rocketSprite[][];
  int x = 0;
  int y = 0;
  int posX;
  int posY = 750;
  int interval = 45;
  int last = 0;
  int speed = 7;
  
  Rocket(int X, int velocity){
    posX = X;
    speed = velocity;
    spriteSheet=loadImage("rocket.png");
    rocketSprite=new PImage[1][10];
    for (int y = 0; y<1; y++){
      for (int x = 0; x<10; x++){
        rocketSprite[y][x] = spriteSheet.get(x*100,y*250,100,250);
      }
    }
  }
  void fly(){
    if (posY<=-500){
      posY = 750;
      posX = int(random(width));
    }
    posY = posY-speed;
    update();
  }
  
    boolean animTimer(){
    if (millis()-last>interval){
      last=millis();
      return true;
    } else {
      return false;
    }
  }
  
  void update(){
    image(rocketSprite[y][x],posX-55,posY,100*.75,250*.75);
    if(animTimer()){
      x++;
      if(x>=10)x=0;
    }
  }
  
}
