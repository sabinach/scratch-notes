#include <iostream>
using namespace std;

int main()
{
    // binary operators: +, -, *, /, %, comma

    cout << 5 + 2 << endl;
    cout << 5 / 2 << endl; // 2
    cout << 5 / 2.0 << endl; // 2.5
    cout << 5 % 2 << endl; // 1

    // unary operators: ++, --

    int counter = 7;
    counter++;
    cout << counter << endl; // 8
    counter--;
    cout << counter << endl; // 7

    int counter2 = 7;
    cout << counter2++ << endl; // 7 (post increment - operation THEN increment)
    cout << ++counter2 << endl; // 8 (pre increment - increment THEN operation)

    // relational operators: <, >, <=, >=, ==, !=

    int a = 5, b = 5;
    cout << (a < b) << endl; // 0 (false)

    // logical operators: &&, ||, !
    int c = 5, d = 8;
    cout << (a==5 && b==5);

    // assignment operators: =, +=, -=, *=, /=, %=
    int x = 5;
    x += 7;
    x = x + 7; // same as +=, assign whatever is in right side to left side

    // ternary operators
    (true) ? cout << "correct!" : cout << "incorrect!";

    return 0;
}