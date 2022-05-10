#include <iostream>
using namespace std;

// depth-first search
//   1. preorder (data, left, right)
//   2. inorder (left, data, right)
//   3. postorder (left, right, data)

struct Node {
    int data;
    Node* left;
    Node* right;
};

Node* createNode(int data) {
    Node* newNode = new Node();
    newNode->data = data;
    newNode->left = newNode->right = nullptr;
    return newNode;
}

void printTreePreorder(Node* root) {
    if (root == nullptr ) return; // base condition
    cout << root->data << endl;
    printTreePreorder(root->left);
    printTreePreorder(root->right);
}

void printTreeInorder(Node* root) {
    if (root == nullptr ) return; // base condition
    printTreeInorder(root->left);
    cout << root->data << endl;
    printTreeInorder(root->right);
}

void printTreePostorder(Node* root) {
    if (root == nullptr ) return; // base condition
    printTreePostorder(root->left);
    printTreePostorder(root->right);
    cout << root->data << endl;
}

int main() {
    // level 1
    Node* root = createNode(1);
    // level 2
    root->left = createNode(2);
    root->right = createNode(3);
    // level 3
    root->left->left = createNode(4);
    root->left->right = createNode(5);
    root->right->left = createNode(6);
    root->right->right = createNode(7);
    // level 4
    root->left->right->left = createNode(9);
    root->right->right->left = createNode(15);

    // preorder
    cout << "Preorder" << endl;
    printTreePreorder(root);

    // inorder
    cout << "Inorder" << endl;
    printTreeInorder(root);

    // postorder
    cout << "Postorder" << endl;
    printTreePostorder(root);

    return 0;
}