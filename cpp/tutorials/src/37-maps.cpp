#include <iostream>
#include <map>
#include <string>

using namespace std;

// map collections is like dictionary
// orders keys in ascending order
// need to use unordered_map if don't want it to be ordered

int main() 
{
    map<string, string> myDict;
    myDict.insert(pair<string, string>("strawberry", "die Erdbeere"));
    myDict.insert(pair<string, string>("orange", "die Orange, die Apfelsine"));
    myDict.insert(pair<string, string>("apple", "die Apfel"));
    myDict.insert(pair<string, string>("banana", "die Banane"));

    myDict["strawberry"] = "Die Erdbeere";
    //myDict.clear();
    cout << myDict.size() << endl;

    for (auto pair : myDict)
        cout << pair.first << " - " << pair.second << endl;

    return 0;
}