#include <iostream>
using namespace std;

int getNumber() {
    return 5;
}

int add(int a, int b) {
    return a + b;
}

int main() {
    // function pointers store the address of a function (as opposed to a variable)

    cout << getNumber() << endl; // 5
    cout << &getNumber << endl;  // address of function

    int(*funcPtr)() = getNumber; // function pointer that can point to any function that returns int, that requires no function parameters
    cout << funcPtr() << endl;   // 5

    int(*funcPtr2)(int, int) = add;
    cout << add(2, 3) << endl;
    cout << funcPtr2(3, 4) << endl;

    return 0;
}