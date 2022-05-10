#include <iostream>
using namespace std;

int recursiveSum(int m, int n) {
    if (m==n) // base case
        return m;
    return m + recursiveSum(m + 1, n); // 2 + (3 + (4) )
}

int main() {
    int m=2, n=4;
    cout << "sum = " << recursiveSum(m, n) << endl;

    /*
    int sum = 0;
    for (int i = m, i <= n; i++) {
        sum += i;
    }
    cout << "sum = " << sum << endl;
    */

    return 0;
}