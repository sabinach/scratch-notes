#include <iostream>
using namespace std;

int main()
{
    cout << (int)'a' << endl; // 97
    cout << int('a') << endl; // 97
    cout << int('A') << endl; // 65

    char c1, c2, c3, c4, c5;
    cout << "Enter 5 letters: "; // does not include space and enter
    cin >> c1 >> c2 >> c3 >> c4 >> c5;
    cout << "ASCII message: " << int(c1) << " " << int(c2) << " " << int(c3)
        << " " << int(c4) << " " << int(c5);

    return 0;
}