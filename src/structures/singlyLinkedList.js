export class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

export class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    append(value) {
        const newNode = new Node(value);

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

    removeByCode(code) {
        if (!this.head) return null;

        if (this.head.value.code === code) {
            const removedNode = this.head;
            this.head = this.head.next;
            this.length--;

            if (this.length === 0) {
                this.tail = null;
            }
            return removedNode;
        }

        let currentNode = this.head;
        while (currentNode.next) {
            if (currentNode.next.value.code === code) {
                const removedNode = currentNode.next;
                currentNode.next = currentNode.next.next;
                this.length--;

                if (!currentNode.next) {
                    this.tail = currentNode;
                }
                return removedNode;
            }
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

    exists(code) {
        let currentNode = this.head;
        while (currentNode) {
            if (currentNode.value.code === code) {
                return true;
            }
            currentNode = currentNode.next;
        }
        return false;
    }
}
