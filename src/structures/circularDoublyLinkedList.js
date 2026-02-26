export class CircularDoubleNode {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

export class CircularDoublyLinkedList {
    constructor() {
        this.head = null;
        this.length = 0;
    }

    append(value) {
        const newNode = new CircularDoubleNode(value);

        if (!this.head) {
            this.head = newNode;
            newNode.next = newNode;
            newNode.prev = newNode;
        } else {
            const tail = this.head.prev;

            // Update links for the new node
            newNode.next = this.head;
            newNode.prev = tail;

            // Link the old tail to the new node
            tail.next = newNode;

            // Link the head back to the new tail
            this.head.prev = newNode;
        }

        this.length++;
        return this;
    }

    removeById(id) {
        if (!this.head) return null;

        let currentNode = this.head;

        // Look for node with the matching id
        for (let i = 0; i < this.length; i++) {
            if (currentNode.value.id === id) {
                // If there's only one node
                if (this.length === 1) {
                    this.head = null;
                } else {
                    const prevNode = currentNode.prev;
                    const nextNode = currentNode.next;

                    prevNode.next = nextNode;
                    nextNode.prev = prevNode;

                    if (currentNode === this.head) {
                        this.head = nextNode;
                    }
                }

                this.length--;
                return currentNode;
            }
            currentNode = currentNode.next;
        }

        return null;
    }

    toArray(limit = this.length) {
        if (!this.head) return [];

        const array = [];
        let currentNode = this.head;

        for (let i = 0; i < limit; i++) {
            array.push(currentNode.value);
            currentNode = currentNode.next;
        }

        return array;
    }

    getHead() {
        return this.head;
    }

    size() {
        return this.length;
    }
}
