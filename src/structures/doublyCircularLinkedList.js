export class DoublyCircularNode {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

export class DoublyCircularLinkedList {
    constructor() {
        this.head = null;
        this.length = 0;
    }

    append(value) {
        const newNode = new DoublyCircularNode(value);

        if (!this.head) {
            this.head = newNode;
            newNode.next = newNode;
            newNode.prev = newNode;
        } else {
            const tail = this.head.prev;

            newNode.next = this.head;
            newNode.prev = tail;

            tail.next = newNode;
            this.head.prev = newNode;
        }

        this.length++;
        return this;
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

    size() {
        return this.length;
    }
}
