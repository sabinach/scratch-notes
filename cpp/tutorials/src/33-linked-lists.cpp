#include <iostream>
using namespace std;

// advantages
//   - can increase size of linked list wherever

// disadvantages
//   - items in different places in memory, so random access to elements not allowed (must be traversed)
//   - need more memory
//   - cannot use built-in datatype, need to create user-defined datatype to represent elements in a linked list

class Node {
public:
    int Value;
    Node* Next; // pointer to the next node
};

void printList(Node* n) {
    while (n!=NULL) {
        cout << n->Value << endl;
        n = n->Next;
    }
}

int main() {
    Node* head = new Node(); // using pointers because need to dynamically allocate memory
    Node* second = new Node();
    Node* third = new Node();

    head->Value = 1; // use -> because it's a class
    head->Next = second;

    second->Value = 2;
    second->Next = third;

    third->Value = 3;
    third->Next = NULL;

    printList(head);

    return 0;
}