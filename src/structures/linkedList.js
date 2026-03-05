export class LinkedNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

export class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    append(value) {
        const newNode = new LinkedNode(value);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }

        this.length++;
        return this;
    }

    removeById(id) {
        if (!this.head) return null;

        if (this.head.value.id === id) {
            const removedNode = this.head;
            this.head = this.head.next;

            if (!this.head) {
                this.tail = null;
            }

            this.length--;
            return removedNode;
        }

        let previousNode = this.head;
        let currentNode = this.head.next;

        while (currentNode) {
            if (currentNode.value.id === id) {
                previousNode.next = currentNode.next;

                if (currentNode === this.tail) {
                    this.tail = previousNode;
                }

                this.length--;
                return currentNode;
            }

            previousNode = currentNode;
            currentNode = currentNode.next;
        }

        return null;
    }

    toArray() {
        const array = [];
        let currentNode = this.head;

        while (currentNode) {
            array.push(currentNode.value);
            currentNode = currentNode.next;
        }

        return array;
    }

    size() {
        return this.length;
    }
}
