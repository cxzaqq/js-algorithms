const defaultHasshTableSize = 32;

export default class CustomHashTable {
  constructor(hashTableSize = defaultHasshTableSize) {
    this.buckets = Array.from({ length: hashTableSize }, () => []);
  }

  hash(key) {
    const hash = Array.from(key).reduce((a, c) => a + c.charCodeAt(0), 0);

    return hash % this.buckets.length;
  }

  set(key, value) {
    const keyHash = this.hash(key);
    let needNewSet = true;
    for (let i = 0; i < this.buckets[keyHash].length; i++) {
      if (this.buckets[keyHash][i][0] === key) {
        this.buckets[keyHash][i][1] = value;
        needNewSet = false;
        break;
      }
    }
    if (needNewSet) this.buckets[keyHash].push([key, value]);
  }

  get(key) {
    const keyHash = this.hash(key);
    for (let i = 0; i < this.buckets[keyHash].length; i++) {
      if (this.buckets[keyHash][i][0] === key) {
        return this.buckets[keyHash][i][1];
      }
    }
    return null;
  }

  delete(key) {
    const keyHash = this.hash(key);
    for (let i = 0; i < this.buckets[keyHash].length; i++) {
      if (this.buckets[keyHash][i][0] === key) {
        return this.buckets[keyHash].splice(i, 1);
      }
    }
    return null;
  }
}
