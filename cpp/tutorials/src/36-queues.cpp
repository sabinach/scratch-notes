#include <iostream>
#include <queue>
using namespace std;

// FIFO - first in, first out (first come, first serve)
//    we use queues when we need things to happen in the order they were called, but computer can't execute fast enough

void printQueue(queue<int> queue) {
    while (!queue.empty()) {
        cout << queue.front() << " ";
        queue.pop();
    }
    cout << endl;
}

int main() {
    queue<int> myQueue;
    myQueue.push(1);
    myQueue.push(2);
    myQueue.push(3);

    cout << "Size is " << myQueue.size() << endl;
    cout << "First element is " << myQueue.front() << endl;
    cout << "Last element is " << myQueue.back() << endl;

    cout << "My queue: " << endl;
    printQueue(myQueue);

    return 0;
}