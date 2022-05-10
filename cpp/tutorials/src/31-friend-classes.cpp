#include <iostream>
using namespace std;

// friend classes are NOT mutual and NOT inherited 

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

    friend class Homework;
};

// friend class
class Homework {
public:
    void PrintResults(EquilateralTriangle et) {
        cout << "circumference = " << et.circumference << endl;
        cout << "area = " << et.area << endl;
    }

};

int main() {
    EquilateralTriangle et;
    et.setA(3);

    Homework h;
    h.PrintResults(et);

    return 0;
}