#include <iostream>
using namespace std;

// vocab: root node (no parent), leaf node (no child), nodes (values), edges (connectors)
// binary trees - parent cannot have more than one child node
// BST (binary search tree) - left child is lower than parent, right child is higher than parent

struct Node {
    int data;
    Node* left;
    Node* right;
};

// 1. create new node
// 2. set value for node
// 3. take care of left and right child nodes (initially node)
// 4. return reference to node we just added
Node* createNode(int data) {
    Node* newNode = new Node();
    newNode->data = data;
    newNode->left = newNode->right = nullptr;
    return newNode;
};

int main() {
    //      1
    //    2   3
    //  4

    /*
    Node* root = createNode(1);
    root->left = createNode(2);
    root->right = createNode(3);
    root->left->left = createNode(4);
    */

    //        1             // level 1
    //    2       3         // level 2
    //  4   5   6   7       // level 3
    //     9       15       // level 4
    
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

    return 0;
}