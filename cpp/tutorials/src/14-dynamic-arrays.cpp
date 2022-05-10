#include <iostream>
using namespace std;

int main()
{
    // static arrays: requires array length to be known at compile-time
    // dynamic arrays: create an array at run-time by allocating and deallocating memory

    int size;
    cout << "Size: ";
    cin >> size;

    //int myArray[size]; // doesn't work because requires size to be constant and known at compile time
    int* myArray = new int[size]; // new = command that will allocate memory when needed

    for(int i=0; i<size; i++) {
        cout << "Array[" << i << "] = ";
        cin >> myArray[i];
    }

    for(int i=0; i<size; i++) {
        cout << myArray[i] << " ";
        //cout << *(myArray+i) << " ";
    }

    // delete = command that will de-allocate memory when not used
    delete[]myArray; // de-allocate the array, so no longer used in our program anymore
    myArray = NULL;  // variable will not point to an address anymore

    return 0;
}