export default class CustomQueue extends Array {
  constructor() {
    super();
  }

  enqueue(value) {
    this.push(value);
    return this;
  }

  dequeue() {
    return this.shift();
  }

  isEmpty() {
    return this.length === 0 ? true : false;
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }

    return this[0];
  }
}
