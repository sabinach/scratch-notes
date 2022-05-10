#include <iostream>
using namespace std;

int main()
{
    /*
    int luckyNumbers[5] = { 1,2,3,4,5 };
    cout << luckyNumbers << endl;       // 0x7ff7b1237770: address of first element of array!
    cout << &luckyNumbers[0] << endl;   // 0x7ff7b1237770

    cout << luckyNumbers[2] << endl;    // 3
    cout << *(luckyNumbers+2) << endl;  // 3: add two more addresses, then dereference 
                                        //    use address of first element, then add 2, then show whatever values is at the updated address
    */

   int luckyNumbers[5];
    for (int i = 0; i <= 4; i++ ) {
        cout << "Number: ";
        cin >> luckyNumbers[i];
    }

    for (int i = 0; i <= 4; i++) { // if i <= 5, then will access wrong memory location!
        cout << *(luckyNumbers+i) << endl;
    }

    return 0;
}