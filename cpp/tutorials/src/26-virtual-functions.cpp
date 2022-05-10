#include <iostream>
using namespace std;

class Instrument {
public:
    virtual void MakeSound() { // virtual: don't use if method exists in derived class
        cout << "Instrument playing..." << endl;
    }
};

class Accordion:public Instrument {
public:
    void MakeSound() { // if this doesn't exist, it will use the base class MakeSound()
        cout << "Accordion playing..." << endl;
    }
};

int main() {

    //Instrument i1;
    //il.MakeSound();

    Instrument* accordion = new Accordion();
    accordion->MakeSound();

    return 0;
}