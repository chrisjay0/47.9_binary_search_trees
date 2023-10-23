class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    let newNode = new Node(val);
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    let current = this.root;
    while (current) {
      if (val < current.val) {
        if (!current.left) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
    return this;
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursivelyHelper(node, val) {
    if (val < node.val) {
      if (!node.left) {
        node.left = new Node(val);
        return this;
      } else {
        return this.insertRecursivelyHelper(node.left, val);
      }
    } else {
      if (!node.right) {
        node.right = new Node(val);
        return this;
      } else {
        return this.insertRecursivelyHelper(node.right, val);
      }
    }
  }

  insertRecursively(val) {
    if (!this.root) {
      this.root = new Node(val);
      return this;
    }
    return this.insertRecursivelyHelper(this.root, val);
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let current = this.root;
    while (current) {
      if (val < current.val) {
        current = current.left;
      } else if (val > current.val) {
        current = current.right;
      } else {
        return current;
      }
    }
    return undefined;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursivelyHelper(node, val) {
    if (!node) return undefined;
    if (val < node.val) {
      return this.findRecursivelyHelper(node.left, val);
    } else if (val > node.val) {
      return this.findRecursivelyHelper(node.right, val);
    } else {
      return node;
    }
  }

  findRecursively(val) {
    if (!this.root) {
      return undefined;
    }
    return this.findRecursivelyHelper(this.root, val);
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    let visited = [];
    function helper(node) {
      visited.push(node.val);
      if (node.left) helper(node.left);
      if (node.right) helper(node.right);
    }
    helper(this.root);
    return visited;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    let visited = [];
    function helper(node) {
      if (node.left) helper(node.left);
      visited.push(node.val);
      if (node.right) helper(node.right);
    }
    helper(this.root);
    return visited;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    let visited = [];
    function helper(node) {
      if (node.left) helper(node.left);
      if (node.right) helper(node.right);
      visited.push(node.val);
    }
    helper(this.root);
    return visited;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    let visited = [];
    let queue = [this.root];
    while (queue.length) {
      let current = queue.shift();
      visited.push(current.val);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
    return visited;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */
  remove(val) {
    this.root = this.removeNode(this.root, val);
  }

  removeNode(node, key) {
    if (!node) return null;
    if (key < node.val) {
      node.left = this.removeNode(node.left, key);
      return node;
    } else if (key > node.val) {
      node.right = this.removeNode(node.right, key);
      return node;
    } else {
      if (!node.left && !node.right) return null;
      if (!node.left) return node.right;
      if (!node.right) return node.left;
      let minLargerNode = this.findMinNode(node.right);
      node.val = minLargerNode.val;
      node.right = this.removeNode(node.right, minLargerNode.val);
      return node;
    }
  }

  findMinNode(node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {
    return this.isBalancedHelper(this.root) !== -1;
  }

  isBalancedHelper(node) {
    if (!node) return 0;
    let leftHeight = this.isBalancedHelper(node.left);
    let rightHeight = this.isBalancedHelper(node.right);
    if (
      leftHeight === -1 ||
      rightHeight === -1 ||
      Math.abs(leftHeight - rightHeight) > 1
    ) {
      return -1;
    }
    return Math.max(leftHeight, rightHeight) + 1;
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    if (!this.root || (!this.root.left && !this.root.right)) return undefined;
    let current = this.root;
    while (current) {
      if (!current.right && current.left) {
        return this.findMaxNode(current.left).val;
      }
      if (current.right && !current.right.left && !current.right.right) {
        return current.val;
      }
      current = current.right;
    }
  }

  findMaxNode(node) {
    while (node.right) {
      node = node.right;
    }
    return node;
  }
}

module.exports = BinarySearchTree;
