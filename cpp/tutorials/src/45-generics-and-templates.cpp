#include <iostream>
using namespace std;

// generics - be able to use the same function with different input datatypes (uses templates)

template<typename T> // generic datatype
void Swap(T& a, T& b) { // generic function
    T temp = a;
    a = b;
    b = temp;
}

int main() 
{
    int a = 5, b = 7;
    cout << a << " - " << b << endl;
    Swap<int>(a, b);
    cout << a << " - " << b << endl;

    char c = 'c', d = 'd';
    cout << c << " - " << d << endl;
    Swap<char>(c, d);
    cout << c << " - " << d << endl;

    return 0;
}