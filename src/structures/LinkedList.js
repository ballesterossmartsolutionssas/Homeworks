import Node from "./Node";

class LinkedList {
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
      this.length = 1;
      return newNode;
    }

    this.tail.next = newNode;
    this.tail = newNode;
    this.length += 1;
    return newNode;
  }

  peek(value) {
    let current = this.head;

    while (current) {
      if (current.value === value) {
        return current;
      }
      current = current.next;
    }

    return null;
  }

  size() {
    return this.length;
  }

  remove(value) {
    if (!this.head) {
      return null;
    }

    if (this.head.value === value) {
      const removed = this.head;
      this.head = this.head.next;
      this.length -= 1;

      if (this.length === 0) {
        this.tail = null;
      }

      removed.next = null;
      return removed;
    }

    let previous = this.head;
    let current = this.head.next;

    while (current) {
      if (current.value === value) {
        previous.next = current.next;
        if (current === this.tail) {
          this.tail = previous;
        }
        this.length -= 1;
        current.next = null;
        return current;
      }

      previous = current;
      current = current.next;
    }

    return null;
  }

  print() {
    const values = [];
    let current = this.head;

    while (current) {
      values.push(current.value);
      current = current.next;
    }

    return values;
  }
}

export default LinkedList;
