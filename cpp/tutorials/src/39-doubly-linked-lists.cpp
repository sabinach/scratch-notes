#include <iostream>
using namespace std;

class Node {
public:
    int value;
    Node* next;
    Node* previous;
};

void printForward(Node* head) {
    Node* traverser = head;
    while (traverser != nullptr) {
        cout << traverser->value << endl;
        traverser = traverser->next;
    }
}

void printBackward(Node* tail) {
    Node* traverser = tail;
    while (traverser != nullptr) {
        cout << traverser->value << endl;
        traverser = traverser->previous;
    }
}

int main() {
    Node* head;
    Node* tail;

    // add 1st node

    Node* node = new Node();
    node->value = 1;
    node->next = nullptr;
    node->previous = nullptr;
    head = node;
    tail = node;

    // add 2nd node

    // 1. create a new node
    // 2. node->value = 5
    // 3. node->next = nullptr
    //    node->previous = tail
    // 4. tail->next = node
    // 5. tail = node

    node = new Node();
    node->value = 2;
    node->next = nullptr;
    node->previous = tail;
    tail->next = node;
    tail = node;

    // add 3rd node

    node = new Node();
    node->value = 3;
    node->next = nullptr;
    node->previous = tail;
    tail->next = node;
    tail = node;

    printForward(head);
    printBackward(tail);

    return 0;
}