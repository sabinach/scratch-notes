#include <iostream>
#include "math_utils.h"

int main()
{
    std::cout << utilz::pow(3,3) << std::endl;
    std::cout << utilz::pow(3) << std::endl;

    Rectangle rectangle;
    rectangle.length = 10;
    rectangle.width = 10;

    std::cout << utilz::area(rectangle.length, rectangle.width) << std::endl;
    std::cout << utilz::area(rectangle.length) << std::endl;
    std::cout << utilz::area(rectangle) << std::endl;

    return 0;
}