#include <iostream>
using namespace std;

int main()
{
    int rows, cols;
    cout << "rows: ";
    cin >> rows;
    cout << "cols: ";
    cin >> cols;

    // dynamically allocate arrays

    int** table = new int*[rows]; // int** = pointer to a pointer
                                  // int*[] = create an array of pointers
    for(int i=0; i<rows; i++) {
        table[i] = new int[cols];
    }

    table[1][2] = 88; // row 1, col 2
                      // give me table (list of addresses)
                      // give me address at table index (row)
                      // give me value at address (col)

    // reverse the allocation process to deallocate (else will lose initial addresses)

    for(int i=0; i<rows; i++) {
        delete[] table[i];
    }
    delete[] table;
    table = NULL;

    return 0;
}