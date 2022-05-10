#include <iostream>
#include <stack>
using namespace std;

// LIFO - last in, first out (synonym: FILO - first in, last out)

// empty: check if stack is empty
// size: get number of elements in stack
// top: get top element of stack
// push: add element to stack
// pop: remove element from stack

void printStackElements(stack<int> stack) {
    while (!stack.empty()) {
        cout << stack.top() << endl;
        stack.pop(); // doesn't remove from stack???
    }
}

int main() {
    stack<int> numbersStack;
    
    numbersStack.push(1);
    numbersStack.push(2);
    numbersStack.push(3);
    numbersStack.pop(); // remove first element at top of stack (aka. 3)

    printStackElements(numbersStack);
 
    if(numbersStack.empty())
        cout << "Stack is empty" << endl;
    else 
        cout << "Stack is not empty" << endl;
    cout << "Stack size is " << numbersStack.size() << endl;

    return 0;
}