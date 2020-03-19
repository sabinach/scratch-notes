class Bubble{
  float x;
  float y;
  float speed;
  float diameter;
  color c;
  
  Bubble(){     // overloading -- no arguments
    x = width/2;
    y = height;
    speed = 3;
    diameter = random(20,100);
    c = color(int(random(0, 255)), int(random(0, 255)), int(random(0, 255)));
  }
  
  Bubble(float tempD){
    x = width/2;
    y = height;
    speed = 3;
    diameter = tempD;
    c = 127; // grey
  }
  
  void display(){
    stroke(0);
    fill(c);
    ellipse(x, y, diameter, diameter);
  }
  
  void ascend(){
    y -= speed;
    x += random(-5, 5);
  }
  
  void top(){
    if (y < diameter/2){
      y = diameter/2;
    }
  }
  
}
