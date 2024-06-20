import Comparator from "../../utils/comparator/Comparator";

/**
 * Parent class for Min and Max Heaps.
 */
export default class Heap {
  constructor(comparatorFuction) {
    if (new.target === Heap) {
      throw new TypeError(`Cannot construct Heap instance direnctly`);
    }

    this.heapContainer = [];
    this.compare = new Comparator(comparatorFuction);
  }

  getLeftChildIndex(parentIndex) {
    return 2 * parentIndex + 1;
  }

  getRightChildIndex(parentIndex) {
    return 2 * parentIndex + 2;
  }

  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }

  hasParent(childIndex) {
    return this.getParentIndex(childIndex) >= 0;
  }

  hasLeftChild(parentIndex) {
    return this.getRightChildIndex(parentIndex) < this.heapContainer.length;
  }

  hasRightChild(parentIndex) {
    return this.getRightChildIndex(parentIndex) < this.heapContainer.length;
  }

  leftChild(parentIndex) {
    return this.heapContainer[this.getLeftChildIndex(parentIndex)];
  }

  rightChild(parentIndex) {
    return this.heapContainer[this.getRightChildIndex(parentIndex)];
  }

  parent(childIndex) {
    return this.heapContainer[this.getParentIndex(childIndex)];
  }

  swap(indexOne, indexTwo) {
    const tmp = this.heapContainer[indexTwo];
    this.heapContainer[indexTwo] = this.heapContainer[indexOne];
    this.heapContainer[indexOne] = tmp;
  }

  isEmpty() {
    return !this.heapContainer.length;
  }

  toString() {
    return this.heapContainer.toString();
  }

  /**
   * 서브 클래스가 구현해야 하는 추상 메서드.
   * 두 요소가 올바른 순서에 있는지를 확인.
   * 실제 비교 로직은 서브 클래스에서 구현.
   * @param {*} firstElement
   * @param {*} secondElement
   * @return {boolean}
   */
  pairIsInCorrectOrder(firstElement, secondElement) {
    throw new Error(`
        You have to implement heap pair comparision method for ${firstElement} and ${secondElement} values`);
  }

  /**
   * 마지막 요소 혹은 특정 인덱스의 요소를 순서에 맞게 올림.
   * @param {*} customStartIndex
   */
  heapifyUp(customStartIndex) {
    let currentIndex = customStartIndex || this.heapContainer.length - 1;

    while (
      this.hasParent(currentIndex) &&
      !this.pairIsInCorrectOrder(
        this.parent(currentIndex),
        this.heapContainer[currentIndex]
      )
    ) {
      this.swap(currentIndex, this.getParentIndex(currentIndex));
      currentIndex = this.getParentIndex(currentIndex);
    }
  }

  /**
   * 처음 요소 혹은 특정 인덱스의 요소를 순서에 맞게 내림.
   * @param {*} customStartIndex
   */
  heapifyDown(customStartIndex = 0) {
    let currentIndex = customStartIndex;
    let nextIndex = null;

    while (this.hasLeftChild(currentIndex)) {
      if (
        this.hasRightChild(currentIndex) &&
        this.pairIsInCorrectOrder(
          this.rightChild(currentIndex),
          this.leftChild(currentIndex)
        )
      ) {
        nextIndex = this.getRightChildIndex(currentIndex);
      } else {
        nextIndex = this.getLeftChildIndex(currentIndex);
      }

      if (
        this.pairIsInCorrectOrder(
          this.heapContainer[currentIndex],
          this.heapContainer[nextIndex]
        )
      ) {
        break;
      }

      this.swap(currentIndex, nextIndex);
      currentIndex = nextIndex;
    }
  }

  peek() {
    if (this.heapContainer.length === 0) {
      return null;
    }

    return this.heapContainer[0];
  }

  /**
   * 최상위 요소 제거 및 반환
   */
  poll() {
    if (this.heapContainer.length === 0) {
      return null;
    }

    if (this.heapContainer.length === 1) {
      return this.heapContainer.pop();
    }

    const item = this.heapContainer[0];

    // 힙 성질 유지를 위해 마지막 요소를 맨 위로 올려 정렬
    this.heapContainer[0] = this.heapContainer.pop();
    this.heapifyDown();

    return item;
  }

  add(item) {
    this.heapContainer.push(item);
    this.heapifyUp();
    return this;
  }

  find(item, comparator = this.compare) {
    const foundItemIndices = [];

    for (
      let itemIndex = 0;
      itemIndex < this.heapContainer.length;
      itemIndex += 1
    ) {
      if (comparator.equal(item, this.heapContainer[itemIndex])) {
        foundItemIndices.push(itemIndex);
      }
    }

    return foundItemIndices;
  }

  remove(item, comparator = this.compare) {
    const numberOfItemsToRemove = this.find(item, comparator).length;

    for (let iteration = 0; iteration < numberOfItemsToRemove; iteration += 1) {
      // 요소 제거 후 인덱스가 변경될 수 있기에 다시 find 호출
      const indexToRemove = this.find(item, comparator).pop();

      if (indexToRemove === this.heapContainer.length - 1) {
        // 삭제해야 할 요소가 마지막이라면 그냥 삭제
        this.heapContainer.pop();
      } else {
        // 삭제해야 할 요소가 마지막이 아니라면
        // 마지막 요소를 삭제해야 할 위치로 이동
        this.heapContainer[indexToRemove] = this.heapContainer.pop();

        const parentItem = this.parent(indexToRemove);

        if (
          this.hasLeftChild(indexToRemove) &&
          (!parentItem ||
            this.pairIsInCorrectOrder(
              parentItem,
              this.heapContainer[indexToRemove]
            ))
        ) {
          // 자식 요소가 존재하고 부모 요소가 없거나 부모 요소와 순서가 올바를 경우
          this.heapifyDown(indexToRemove);
        } else {
          // 자식 요소가 존재하지 않거나 부모 요소가 있고 부모 요소와 순서가 올바르지 않을 경우
          // if (!this.hasLeftChild(indexToRemove) ||
          //        (parentItem &&
          //            !this.pairIsInCorrectOrder(parentItem, this.heapContainer[indexToRemove]))
          // )
          this.heapifyUp(indexToRemove);
        }
      }
    }

    return this;
  }
}
