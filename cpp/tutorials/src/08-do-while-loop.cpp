#include <iostream>
using namespace std;

int main()
{
    int pin = 1234, userInput, errorCounter = 0;

    do {
        cout << "PIN: ";
        cin >> userInput;
        if(pin!=userInput) errorCounter++;
    } while (errorCounter<3 && pin!=userInput);

    if (errorCounter < 3)
        cout << "Correct!";
    else 
        cout << "Blocked.";

    return 0;
}