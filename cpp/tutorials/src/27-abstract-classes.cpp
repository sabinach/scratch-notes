#include <iostream>
using namespace std;

// abstraction: showing important info while hiding the less important/complex details
//              abstracted details also don't change often as long as UI doesn't change (from the end user POV)

class Instrument { // abstract class because it has at least one pure virtual function, unable to create instances of abstract classes, but can make pointers
public:
    virtual void MakeSound() = 0; // pure virtual function: delete implementation, force derived classes to create method themselves
};

class Accordion:public Instrument {
public:
    void MakeSound() { // if this doesn't exist, it will use the base class MakeSound()
        cout << "Accordion playing..." << endl;
    }
};

class Piano: public Instrument {
public:
    void MakeSound() {
        cout << "Piano playing..." << endl;
    }
};

int main() {

    Instrument* accordion = new Accordion();
    //accordion->MakeSound();

    Instrument* piano = new Piano();
    //piano->MakeSound();

    Instrument* instruments[2] = { accordion, piano };
    for(int i=0; i<2; i++){
        instruments[i]->MakeSound();
    }

    return 0;
}