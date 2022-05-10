#include <iostream>
#include <string>
using namespace std;

// exceptions are used to handle different types of errors that 
//    can occur during the execution of a program

class Printer {
    string _name; // use '_' to denote private member
    int _availablePaper;

public:
    Printer(string name, int paper) { // constructor
        _name = name;
        _availablePaper = paper;
    }
    
    void Print(string txtDoc) {
        int requiredPaper = txtDoc.length() / 10; // each sheet of paper can print 10 characters

        if(requiredPaper > _availablePaper)
            throw "No paper"; // will auto-return, so no need to write 'return' after

        cout << "Printing..." << txtDoc << endl;
        _availablePaper -= requiredPaper;
    }
};

int main() {
    Printer myPrinter("HP", 10);

    try {
        myPrinter.Print("Hello World! This is a test print to see how much the printer can print.");
        myPrinter.Print("Hello World! This is a test print to see how much the printer can print.");
        myPrinter.Print("Hello World! This is a test print to see how much the printer can print.");
    }
    catch (const char* txtException) {
        cout << "Exception: " << txtException << endl;
    }
    catch (int exceptionCode) { // throw 101;
        cout << "Exception: " << exceptionCode << endl;
    }
    catch (...) { // default exception handler - can handle any type of exception, attempt to execute above handlers before default (must come last)
        cout << "Exception occured!" << endl;
    }

    return 0;
}