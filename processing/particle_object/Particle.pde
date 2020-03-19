class Particle{
  float x, y;
  float r;
  
  Particle(float tempX, float tempY, float tempR){
    x = tempX;
    y = tempY;
    r = tempR;
  }
  
  void display(){
    stroke(255);
    noFill();
    ellipse(x, y, r*2, r*2);
  }
  
  boolean overlaps(Particle other){
    float d = dist(x, y, other.x, other.y);
    return d < r + other.r;
  }
  
}
