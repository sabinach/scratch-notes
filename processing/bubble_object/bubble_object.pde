Bubble b1;
Bubble b2;
Bubble b3;

void setup(){
  size(640, 360);
  b1 = new Bubble(64);
  b2 = new Bubble(16);
  b3 = new Bubble();
}

void draw(){
  background(255);
  
  b1.display();
  b1.ascend();
  b1.top();
  
  b2.display();
  b2.ascend();
  b2.top();
  
  b3.display();
  b3.ascend();
  b3.top();
}
