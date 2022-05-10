#include <iostream>
using namespace std;

int getMin(int numbers[], int size) {
    int min = numbers[0];
    for (int i=1; i<size; i++){
        if(numbers[i] < min)
            min = numbers[i];
    }
    return min;
}

int getMax(int numbers[], int size) {
    int max = numbers[0];
    for (int i=1; i<size; i++){
        if(numbers[i] > max)
            max = numbers[i];
    }
    return max;
}

void getMinAndMax(int numbers[], int size, int* min, int* max) {
    for (int i=1; i<size; i++){
        if(numbers[i] < *min)
           *min = numbers[i]; // directly modify the values in that address
        if(numbers[i] > *max)
            *max = numbers[i];
    }
}

int main() {
    int numbers[5] = { 5, 4, -29, 2, 1 };
    
    //cout << "min: " << getMin(numbers, 5) << endl;
    //cout << "max: " << getMax(numbers, 5) << endl;

    int min = numbers[0];
    int max = numbers[0];
    getMinAndMax(numbers, 5, &min, &max); // pass parameter using a reference
    cout << "min: " << min << endl;
    cout << "max: " << max << endl;

    return 0;
}