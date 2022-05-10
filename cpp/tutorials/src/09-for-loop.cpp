#include <iostream>
using namespace std;

int main()
{
    // factorial: 6! = 6 * 5 * 4 * 3 * 2 * 1 = 720

    int number;
    cout << "Number: ";
    cin >> number;

    int factorial = 1;
    for (int i = 1; i <= number; i ++ ) {
        factorial = factorial * i;
    }

    cout << "Factorial of " << number << " is " << factorial << ".";

    return 0;
}