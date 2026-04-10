export class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }

    isLeaf() {
        return !this.left && !this.right;
    }
}

export class BinaryTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const newNode = new TreeNode(value);

        if (!this.root) {
            this.root = newNode;
            return true;
        }

        let current = this.root;

        while (current) {
            if (value === current.value) {
                return false;
            }

            if (value < current.value) {
                if (!current.left) {
                    current.left = newNode;
                    return true;
                }

                current = current.left;
                continue;
            }

            if (!current.right) {
                current.right = newNode;
                return true;
            }

            current = current.right;
        }

        return false;
    }

    contains(value) {
        let current = this.root;

        while (current) {
            if (value === current.value) {
                return true;
            }

            current = value < current.value ? current.left : current.right;
        }

        return false;
    }

    preOrder(node = this.root, result = []) {
        if (!node) return result;

        result.push(node.value);
        this.preOrder(node.left, result);
        this.preOrder(node.right, result);
        return result;
    }

    inOrder(node = this.root, result = []) {
        if (!node) return result;

        this.inOrder(node.left, result);
        result.push(node.value);
        this.inOrder(node.right, result);
        return result;
    }

    postOrder(node = this.root, result = []) {
        if (!node) return result;

        this.postOrder(node.left, result);
        this.postOrder(node.right, result);
        result.push(node.value);
        return result;
    }

    toD3(node = this.root) {
        if (!node) {
            return null;
        }

        const children = [this.toD3(node.left), this.toD3(node.right)].filter(Boolean);

        return {
            name: String(node.value),
            attributes: {
                kind: node.isLeaf() ? 'Leaf' : 'Branch'
            },
            children
        };
    }
}
