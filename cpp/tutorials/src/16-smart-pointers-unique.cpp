#include <iostream>
#include <memory>
using namespace std;

class MyClass {
public:
    MyClass() {
        cout << "Constructor invoked" << endl;
    }
    ~MyClass() {
        cout << "Destructor invoked" << endl;
    }
}; // semi-colon required after class bracket!

int main() {
    // smart pointers: deallocate memory automatically (so we don't need to worry about memory leaks in our program)
    // smart pointer types: unique pointer, shared pointer, weak pointer

    unique_ptr<int>unPtr1 = make_unique<int>(25); 

    cout << unPtr1 << endl; // 0x600002128030
    cout << *unPtr1 << endl; // 25: dereference pointer

    //unique_ptr<int>unPtr2 = unPtr1; // cannot share pointers!
    unique_ptr<int>unPtr2 = move(unPtr1); // unPtr2 is now the owner of this memory address

    cout << *unPtr2 << endl; // 5
    cout << *unPtr1 << endl; // NULL pointer exception

    // constructor: special method that is invoked with an object is created/constructed
    // destructor: special method that is invoked when an object is destroyed

    unique_ptr<MyClass>unPtr1 = make_unique<MyClass>();

    return 0;
} // unique pointer is destroyed at end of scope