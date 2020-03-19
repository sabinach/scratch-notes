float x;
float y;
float speed;

void setup() {
  size(640, 360);
  x = width/2;
  y = height;
  speed = 2;
}

void draw(){
  background(255);
  display();
  ascend();
  top();
}

void display(){
  stroke(0);
  strokeWeight(2);
  fill(127);
  ellipse(x, y, 64, 64);
}

void ascend(){
  y -= speed;
}

void top(){
  if (y < 32){
    y = 32;
  }
}
