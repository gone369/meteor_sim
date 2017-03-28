class Particle {
  int posX;
  int posY = 750;
  int speed;
  
  Particle(int X, int velocity){
    posX = X;
    speed = velocity;
  }
  void fly(){
    if (posY<=-500){
      posY = 750;
      posX = int(random(width));
    }
    posY = posY-speed;
    display();
  }
  
  void display(){
    image(cloud,posX-250,posY);
  }
}
