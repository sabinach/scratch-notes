#include <iostream>
using namespace std;

// friend function can access private or protected members of another class because they are 'friends' with that class

class EquilateralTriangle {
private:
    float a;
    float circumference;
    float area;

public:
    void setA(float length) {
        a = length;
        circumference = a*3;
        area = (1.73 * a * a) / 4;
    }

    friend void PrintResults(EquilateralTriangle); // declaration of friend function 
                                                   // one class can have multiple friend functions
};

// friend function
void PrintResults(EquilateralTriangle et) {
    cout << "circumference = " << et.circumference << endl;
    cout << "area = " << et.area << endl;
}

int main() {
    EquilateralTriangle et;
    et.setA(3);

    PrintResults(et);

    return 0;
}