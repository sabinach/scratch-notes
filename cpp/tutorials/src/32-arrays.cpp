#include <iostream>
using namespace std;

// arrays
// pros: store data in continuous memory, makes accessing elements in array very quick
// cons: will need to know the size of the array at compilation time
//       cannot change the size, will need to create bigger array and copy smaller array

int main()
{
    float monthsArray[12];

    float total = 0;
    for (int i = 0; i <= 11; i++) {
        cout << "Enter amount for month " << i+1 << ":";
        cin >> monthsArray[i];
        total += monthsArray[i];

        float average = total / 12;
        float inTwoYears = average * 24;

        cout << "total = " << total << endl;
        cout << "average = " << average << endl;
        cout << "inTwoYears = " << inTwoYears << endl;
    }

    return 0;
}