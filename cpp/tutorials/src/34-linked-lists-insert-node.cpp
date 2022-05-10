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

void insertAtFront(Node** head, int newValue) {
    // 1. Prepare a newNode
    Node* newNode = new Node();
    newNode->Value = newValue;

    // 2. Put it in front of current head
    newNode->Next = *head;

    // 3. Move had of the list to point to the new node
    *head = newNode;
}

void insertAtEnd(Node** head, int newValue) {
    // 1. Prepare a newNode
    Node* newNode = new Node();
    newNode->Value = newValue;
    newNode->Next = NULL;

    // 2. If linked list is empty, newNode will be a head node
    if (*head == NULL) {
        *head = newNode;
        return;
    }

    // 3. Find last node
    Node* last = *head;
    while (last->Next != NULL) {
        last = last->Next;
    }

    // 4. Insert newNode after last node (at the end)
    last->Next = newNode;
}

void insertAfter(Node* previous, int newValue) {
    // 1. Check if previous node is NULL
    if (previous == NULL) {
        cout << "Previous node cannot be NULL.";
        return;
    }

    // 2. Prepare a newNode
    Node* newNode = new Node();
    newNode->Value = newValue;

    // 3. Insert newNode after previous
    newNode->Next = previous->Next;
    previous->Next = newNode;
}

int main() {
    Node* head = new Node();
    Node* second = new Node();
    Node* third = new Node();

    head->Value = 1; // use -> because it's a class
    head->Next = second;

    second->Value = 2;
    second->Next = third;

    third->Value = 3;
    third->Next = NULL;

    insertAtFront(&head, -1); // address of head
    insertAtFront(&head, -2);
    insertAtEnd(&head, 4);
    insertAfter(head, -3);
    insertAfter(second, -4);

    printList(head);

    return 0;
}