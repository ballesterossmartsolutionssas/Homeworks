export class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

export class CircularLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    // Add at the end of the circular list
    append(value) {
        const newNode = new Node(value);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            newNode.next = newNode; // Points to itself
        } else {
            newNode.next = this.head; // New tail points to head
            this.tail.next = newNode; // Old tail points to new tail
            this.tail = newNode;      // Update tail reference
        }

        this.length++;
        return this;
    }

    // Get the total number of items
    size() {
        return this.length;
    }

    // Return the first node to begin iteration
    getHead() {
        return this.head;
    }

    // Convert to array for easy debugging and UI counts
    toArray() {
        if (!this.head) return [];

        const array = [];
        let currentNode = this.head;

        // In a circular list, we loop until we hit the head again
        do {
            array.push(currentNode.value);
            currentNode = currentNode.next;
        } while (currentNode !== this.head);

        return array;
    }
}
