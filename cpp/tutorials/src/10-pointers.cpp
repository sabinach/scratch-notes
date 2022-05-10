#include <iostream>
using namespace std;

int main()
{
    int n = 5;
    cout << n << endl;    // 5
    cout << &n << endl;   // 0x7ff7b6c4d778 (physical address of where n is stored)

    int* ptr = &n;        // pointers are special variables that can hold an address (of the same type variable)
    cout << ptr << endl;  // 0x7ff7b6c4d778 (ptr is holding address of n variable)
    cout << *ptr << endl; // 5 (dereference the pointer)

    *ptr = 10;
    cout << *ptr << endl; // 10
    cout << n << endl;    // 10

    int v;
    int* ptr2 = &v;
    *ptr2 = 7;

    cout << "v = " << v << endl; // v = 7

    return 0;
}