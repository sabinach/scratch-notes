#include <iostream>
using namespace std;

int main()
{
    float annualSalary;
    cout << "Please enter your annual salary: $";
    cin >> annualSalary;
    float monthlySalary = annualSalary/12;
    cout << "Your monthly salary is: $" << monthlySalary << endl;
    cout << "In 10 years you will earn: $" << annualSalary*10 << endl;

    int yearOfBirth = 1995;
    char gender = 'f';
    bool isOlderThan18 = true;
    float averageGrade = 4.5;
    double balance = 45678945856;

    cout << "sizeof int: " << sizeof(int) << " bytes" << endl;
    cout << "sizeof unsigned int " << sizeof(unsigned int) << " bytes" << endl;
    cout << "sizeof char: " << sizeof(char) << " bytes" << endl;
    cout << "sizeof bool: " << sizeof(bool) << " bytes" << endl;
    cout << "sizeof float: " << sizeof(float) << " bytes" << endl;
    cout << "sizeof double: " << sizeof(double) << " bytes" << endl;

    cout << "min int: " << INT_MIN << endl; // -1, -2, -3, ..., -2147483648
    cout << "max int: " << INT_MAX << endl; // 0, +1, +2, +3, ..., +2147483647
    cout << "max uint: " << UINT_MAX << endl; // 0, +1, +2, +3, ..., 4294967295 (2^32 - 1)

    // data overflow example
    int intMax = INT_MAX;
    cout << intMax << endl; // +2147483647
    cout << intMax + 1; // -2147483648

    return 0;
}