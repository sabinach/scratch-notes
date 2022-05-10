#include <iostream>
#include <memory>
using namespace std;

int main() 
{
    weak_ptr<int>wePtr1;
    {
        shared_ptr<int>shPtr1 = make_shared<int>(25);
        wePtr1 = shPtr1;
    } // value at wePtr1 deallocated, weak pointers will not keep an object alive after exiting the scope, but shared pointers will

    return 0;
} 