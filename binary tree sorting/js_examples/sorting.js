function bubbleSort(src, printId) {
    
    var result = "";
    for (var i = 0; i < src.length; i++) {
        var minIndex = i;
        for (var j = i + 1; j < src.length; j++) {
            if (src[minIndex] > src[j]) {
                minIndex = j;
            }
        }
        if (i != minIndex) {
            var temp = src[i];
            src[i] = src[minIndex];
            src[minIndex] = temp;
        }
        result = result + "After loop " + i + ": " + src + "<br/>";

    }
    document.getElementById(printId).innerHTML = result;
}

class TreeNode {
    constructor(node) {
        this.node = node;
        this.left = null;
        this.right = null;
    }
}

function insertLeaf(treeNode, node) {
    if (treeNode != null) {
        if (treeNode.node > node) {
            if (treeNode.left != null) insertLeaf(treeNode.left, node);
            else treeNode.left = new TreeNode(node);
        } else {
            if (treeNode.right != null) insertLeaf(treeNode.right, node);
            else treeNode.right = new TreeNode(node);
        }
    } else {
        treeNode = new TreeNode(node);
    }
    return treeNode;
}

function inOrderTraversal(treeNode, result) {
    if (treeNode != null) {
        if (treeNode.left != null) result = inOrderTraversal(treeNode.left, result);
        result = result + treeNode.node.toString() + ", ";
        if (treeNode.right != null) result = inOrderTraversal(treeNode.right, result);
    }
    return result;
}

function binaryTreeSort(src, printId) {
    var root = new TreeNode(src[0]);
    for (var i = 1; i < src.length; i++) {
        insertLeaf(root, src[i]);
    }
    console.log(root);
    
    var result = "";
    result = inOrderTraversal(root, result);
    document.getElementById(printId).innerHTML = result;
}