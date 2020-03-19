float x = 0;
float y = 0;

float xSpeed = 15;
float ySpeed = 15;

void setup(){
  size(800,600);
}

void draw() {
  background(0);
  x += xSpeed;
  y += ySpeed;
  
  if(x>width || x<0){
    xSpeed *= -1;
  }
  
  if(y>height || y<0){
    ySpeed *= -1;
  }
  
  noStroke();
  fill(random(255),random(255),255); //rgb
  ellipse(x, y, 100, 100);
}
