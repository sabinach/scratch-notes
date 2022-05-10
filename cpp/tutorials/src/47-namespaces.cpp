#include <iostream>
#include <string>

//using namespace std; // bad, not recommended
using std::cout;
using std::endl;
using std::string;

namespace ns1 {
    int age = 25;
    string name = "Sabina";
}

namespace ns2 {
    int age = 26;
}

int main() 
{
    cout << ns1::age << endl;
    cout << ns2::age << endl;

    return 0;
}