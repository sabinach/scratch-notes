#include <iostream>
using namespace std;

void printNumber(int* numberPtr) {
    cout << *numberPtr << endl; // write value at the address of the passed in pointer
}

void printLetter(char* charPtr) {
    cout << *charPtr << endl;
}

void print(void* ptr, char type) {
    switch (type) {
        case 'i': // handle int pointer
            cout << *((int*)ptr) << endl; // cast pointer, then dereference
            break;
        case 'c': // handle char pointer
            cout << *((char*)ptr) << endl;
            break;
    }
}

int main() {
    // void pointers can hold address of other datasets, but the void pointer cannot be dereferenced

    int number = 5;
    char letter = 'a';

    //printNumber(&number);
    //printLetter(&letter);

    print(&number, 'i');
    print(&letter, 'c');

    return 0;
}