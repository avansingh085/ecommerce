struct TrieNode {
    TrieNode* left;  
    TrieNode* right; 
    int index;       
    int count;  
    TrieNode() : left(nullptr), right(nullptr), index(-1), count(0) {}
};
class Trie {
private:
    TrieNode* root;

public:
    Trie() {
        root = new TrieNode();
    }

    
    void insert(int num, int idx) {
        TrieNode* curr = root;
        for (int i = 31; i >= 0; i--) {
            int bit = (num >> i) & 1; 
            if (bit == 0) {
                if (!curr->left) {
                    curr->left = new TrieNode();
                }
                curr = curr->left;
            } else {
                if (!curr->right) {
                    curr->right = new TrieNode();
                }
                curr = curr->right;
            }
            curr->count++; 
        }
        curr->index = idx; 
    }

    int search(int num,int k,int &x,int &val) {
        TrieNode* curr = root;
        for (int i = 31; i >= 0; i--) {
            int bit = (num >> i) & 1;
            if (bit == 0) {
                if(curr->left)
                {
                    if(i<k)
                   { x=x|(1<<i);
                    val=val|(1<<i);
                   }
                curr = curr->left;
                }
                else
                curr=curr->right;
            } else {
                if (curr->right) 
                {
                    val=val|(1<<i);
                curr = curr->right;
                }
                else
                curr=curr->left;
            }
        }
        
        return curr->index; 
    }

    void remove(int num) {
        removeHelper(root, num, 31);
    }

private:
   
    bool removeHelper(TrieNode* node, int num, int depth) {
        if (!node) return false;

        if (depth == -1) {
        
            if (node->index == -1) return false;
           node->index=-1;
            return true;
        }

        int bit = (num >> depth) & 1;
        bool shouldDeleteCurrentNode = false;

        if (bit == 0) {
            if (removeHelper(node->left, num, depth - 1)) {
                node->left->count--; 
                if (node->left->count == 0) {
                    delete node->left;
                    node->left = nullptr;
                }
            }
        } else {
            if (removeHelper(node->right, num, depth - 1)) {
                node->right->count--; 
                if (node->right->count == 0) {
                    delete node->right;
                    node->right = nullptr;
                }
            }
        }

        
        return (node->left == nullptr && node->right == nullptr && node->index == -1);
    }

   
    void deleteTrie(TrieNode* node) {
        if (!node) return;
        deleteTrie(node->left);
        deleteTrie(node->right);
        delete node;
    }
};
