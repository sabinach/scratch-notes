#include <iostream>
using namespace std;

int main()
{
    float num1, num2;
    char operation;
    cout << "Calculator" << endl;
    cin >> num1 >> operation >> num2;

    switch(operation)
    {
        case '+':
            cout << num1 << operation << num2 << "=" << num1+num2;
            break;
        case '-':
            cout << num1 << operation << num2 << "=" << num1-num2;
            break;
        case '*':
            cout << num1 << operation << num2 << "=" << num1*num2;
            break;
        case '/':
            cout << num1 << operation << num2 << "=" << num1/num2;
            break;
        case '%':
            if ((int)num1==num1 && (int)num2==num2) // check that both values are whole numbers
                cout << num1 << operation << num2 << "=" << (int)num1 % (int)num2;
            else
                cout << "Invalid!";
            break;
    }

    return 0;
}