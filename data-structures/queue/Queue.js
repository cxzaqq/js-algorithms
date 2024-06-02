import LinkedList from "../linked-list/LinkedList";

export default class Queue {
  constructor() {
    this.linkedList = new LinkedList();
  }

  toString(callback) {
    return this.linkedList.toString(callback);
  }

  enqueue(value) {
    this.linkedList.append(value);
  }

  dequeue() {
    const removeHead = this.linkedList.deleteHead();
    return removeHead ? removeHead.value : null;
  }

  isEmpty() {
    return !this.linkedList.head;
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }

    return this.linkedList.head.value;
  }
}
