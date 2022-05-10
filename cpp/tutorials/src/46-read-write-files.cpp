#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main() 
{
    fstream myFile;

    // write (ios::out)
    myFile.open("test.txt", ios::out); // filename, mode
    if (myFile.is_open()) {
        myFile << "Hello World!\n";
        myFile << "This is the second line\n";
        myFile.close();
    }

    // append (ios::app)
    myFile.open("test.txt", ios::app);
    if (myFile.is_open()) {
        myFile << "This is an appended line\n";
        myFile.close();
    }

    // read from file (ios::in)
    myFile.open("test.txt", ios::in);
    if (myFile.is_open()) {
        string line;
        while (getline(myFile, line)) {
            cout << line << endl;
        }
        myFile.close();
    }

    return 0;
}