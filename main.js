class Tree {
    root;
    constructor(arr) {
        const set = [...new Set(arr.sort((a,b) => a-b))]
        this.root = buildTree(set);
    }

    getRoot() {
        return this.root;
    }

    insert(val, headNode = this.root) {
        // insert node of given value
        if(headNode.val === val) {
            return;
        }
    
        if(headNode.left === null && headNode.val > val) {
            let node = new Node(val);
            headNode.left = node;
        }
        
        if(headNode.right === null && headNode.val < val) {
            let node = new Node(val);
            headNode.right = node;
        }
    
        if (headNode.val < val) {
            this.insert(val, headNode.right);
        } else if (headNode.val > val) {
            this.insert(val, headNode.left);
        }
    }

    delete(val, currNode = this.root) {
        // delete node of given value
        if(currNode === null) {
            return currNode;
        }
        
        if (currNode.val < val) {
            currNode.right = this.delete(val, currNode.right);
        } else if (currNode.val > val) {
            currNode.left = this.delete(val, currNode.left);
        } else {
            if(currNode.left === null) {
                return currNode.right;
            } else if(currNode.right === null) {
                return currNode.left;
            }
    
            currNode.val = minValue(currNode.right);
            currNode.right = this.delete(currNode.val, currNode.right)
        }
    
        return currNode;
    }

    find(val, node = this.root) {
        // find node of given value
        if(node === null) {
            return node;
        }
    
        let foundNode;
    
        if(node.val < val) {
            foundNode = this.find(val, node.right);
        } else if(node.val > val) {
            foundNode = this.find(val, node.left);
        } else {
            return node;
        }
    
        return foundNode;
    }

    levelOrder() {
        // return array in levelOrder form
        if(this.root === null) {
            return;
        }
    
        let queue = []
        queue.push(this.root);
        let levelOrderArray = [];
    
        while (queue.length > 0) {
            let currNode = queue[0];
            levelOrderArray.push(currNode.val);
            if (currNode.left !== null) {
                queue.push(currNode.left);
            } 
            if (currNode.right !== null) {
                queue.push(currNode.right);
            }
    
            queue.shift();
        }
    
        return levelOrderArray;
    }

    preOrder(node = this.root, arr=[]) {
        // return array in preorder (root, left, right)
        if(node === null) {
            return;
        }
    
        arr.push(node.val);
        this.preOrder(node.left, arr);
        this.preOrder(node.right, arr);
    
        return arr;
    }

    inOrder(node = this.root, arr = []) {
        // return array in inorder (left, root, right)
        if(node === null) {
            return;
        }

        this.inOrder(node.left, arr);
        arr.push(node.val);
        this.inOrder(node.right, arr);
    
        return arr;
    }

    postOrder(node = this.root, arr = []) {
        // return array in postOrder (left, right, root)
        if(node === null) {
            return;
        }
    
        this.postOrder(node.left, arr);
        this.postOrder(node.right, arr);
    
        arr.push(node.val);
        return arr;
    }

    height(val, node = this.root) {
        // find height of given value
        if(node === null) {
            return;
        }
    
        let count;
        
        if(node.val > val) {
            count = this.height(val, node.left);
        } else if(node.val < val) {
            count = this.height(val, node.right);
        } else {
           let countRight = goRight(node);
           let countLeft = goLeft(node);
           count = Math.max(countRight, countLeft);
        }
    
        return count;
    }

    heightNode(node = this.root) {
        // find height of given node
        if(node === null) {
            return -1;
        }

        let leftHeight = this.heightNode(node.left);
        let rightHeight = this.heightNode(node.right);

        let count = Math.max(leftHeight, rightHeight);

        return count+1;
    }

    depth(val, node = this.root) {
        // find depth of given value
        if(node === null) {
            return;
        }
        if(node.val === val) {
            return 0
        }
    
        let count;
    
        if(node.val > val) {
            count = this.depth(val, node.left);
        } else if(node.val < val) {
            count = this.depth(val, node.right);
        }
    
        return count+1;
    }

    depthNode(node, headNode = this.root) {
        // find depth of given Node
        if(node === null || headNode === null) {
            return ;
        }
        if(node.val === headNode.val) {
            return 0
        }

        let count;
    
        if(headNode.val > node.val) {
            count = this.depthNode(node, headNode.left);
        } else if(headNode.val < node.val) {
            count = this.depthNode(node, headNode.right);
        }
    
        return count+1;
    }

    isBalanced(node = this.root) {
        if(node === null) {
            return ;
        }
    
        let left = this.heightNode(node.left);
        let right = this.heightNode(node.right);
    
        let difference = Math.abs(left - right);
    
        if(difference > 1) {
            return false;
        }
    
        return true;
    }

    rebalance() {
        let treeArr = this.inOrder(this.root);
        this.root = buildTree(treeArr);
    }
}

class Node {
    constructor (val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

function buildTree(arr) {
    // return root node
    if(arr.length === 0) {
        return null;
    }
    if(arr.length === 1) {
        return new Node(arr[0]);
    }

    let start = 0;
    let end = arr.length - 1;
    let mid = Math.floor((start + end)/2);

    let node = new Node(arr[mid]);
    node.left = buildTree(arr.slice(start, mid));
    node.right = buildTree(arr.slice(mid+1));

    return node;
}

function minValue(node) {
    let minValue;
    while(node !== null) {
        minValue = node.val;
        node = node.left;
    }

    return minValue;
}

function goRight(node) {
    if(node === null) {
        return -1;
    }
    let count = goRight(node.right);
    return count+1;
}

function goLeft(node) {
    if(node === null) {
        return -1;
    }
    let count = goRight(node.left);
    return count+1;
}

module.exports = Tree;