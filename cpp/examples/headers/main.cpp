#include <iostream>
#include "computations.h"

int main()
{
    std::cout << "Double of 3 is " << double_number(3) << std::endl;
    std::cout << "10C = " << celsius_to_fahrenheit(10.0) << std::endl;

    return 0;
}