import DoubleNode from "./DoubleNode";

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.current = null;
    this.length = 0;
  }

  append(value) {
    const newNode = new DoubleNode(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.current = newNode;
      this.length = 1;
      return newNode;
    }

    newNode.prev = this.tail;
    this.tail.next = newNode;
    this.tail = newNode;
    this.length += 1;
    return newNode;
  }

  visit(value) {
    const node = this.append(value);
    this.current = node;
    return node;
  }

  peek(value) {
    let currentNode = this.head;

    while (currentNode) {
      if (currentNode.value === value) {
        return currentNode;
      }
      currentNode = currentNode.next;
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

    let node = this.head;
    while (node && node.value !== value) {
      node = node.next;
    }

    if (!node) {
      return null;
    }

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
      this.current = null;
      this.length = 0;
      return node;
    }

    if (node === this.head) {
      this.head = node.next;
      this.head.prev = null;
      if (this.current === node) {
        this.current = this.head;
      }
      this.length -= 1;
      node.next = null;
      return node;
    }

    if (node === this.tail) {
      this.tail = node.prev;
      this.tail.next = null;
      if (this.current === node) {
        this.current = this.tail;
      }
      this.length -= 1;
      node.prev = null;
      return node;
    }

    node.prev.next = node.next;
    node.next.prev = node.prev;

    if (this.current === node) {
      this.current = node.next || node.prev;
    }

    this.length -= 1;
    node.prev = null;
    node.next = null;
    return node;
  }

  back() {
    if (!this.current || !this.current.prev) {
      return null;
    }

    this.current = this.current.prev;
    return this.current;
  }

  forward() {
    if (!this.current || !this.current.next) {
      return null;
    }

    this.current = this.current.next;
    return this.current;
  }

  print() {
    const values = [];
    let node = this.head;

    while (node) {
      values.push(node.value);
      node = node.next;
    }

    return values;
  }
}

export default DoublyLinkedList;
