const Tree = require("./main")

const randomArray = (size) => {
    let arr = []
    for(let i=0; i<size; i++) {
        arr[i] = Math.floor(Math.random() * 100);
    }

    return arr;
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.val}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

const tree = new Tree(randomArray(20));
prettyPrint(tree.getRoot());

console.log("Balanced : "  + tree.isBalanced());
console.log("Level Order : " + tree.levelOrder());
console.log("Pre Order : " + tree.preOrder());
console.log("In Order : " + tree.inOrder());
console.log("Post Order : " + tree.postOrder());

tree.insert(101);
tree.insert(150);
tree.insert(495);
tree.insert(129);

console.log("Balanced : "  + tree.isBalanced());
console.log("Rebalancing Tree");
tree.rebalance();
console.log("Balanced : "  + tree.isBalanced());
console.log("Level Order : " + tree.levelOrder());
console.log("Pre Order : " + tree.preOrder());
console.log("In Order : " + tree.inOrder());
console.log("Post Order : " + tree.postOrder());

prettyPrint(tree.getRoot());
// prettyPrint(tree.getRoot());

// console.log(tree.height(6));
// console.log(tree.depth(8));

// tree.rebalance();
// prettyPrint(tree.getRoot());
// tree.delete(5)
// prettyPrint(tree.getRoot());
// console.log(tree.heightNode());
// console.log(tree.find(8))
// let node = tree.find(8)
// console.log(tree.depthNode(node))