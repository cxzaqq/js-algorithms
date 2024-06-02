import CustomQueue from "../CustomQueue";

describe("CustomQueue", () => {
  it("should create empty queue", () => {
    const queue = new CustomQueue();
    expect(queue).not.toBeNull();
    expect(queue).toStrictEqual([]);
  });

  it("should enqueue data to queue", () => {
    const queue = new CustomQueue();

    queue.enqueue(1);
    queue.enqueue(2);

    expect(queue).toStrictEqual([1, 2]);
  });

  it("should dequeue data from queue in FIFO order", () => {
    const queue = new CustomQueue();

    queue.enqueue(1);
    queue.enqueue(2);

    expect(queue.dequeue()).toBe(1);
    expect(queue).toStrictEqual([2]);
    expect(queue.dequeue()).toBe(2);
    expect(queue).toStrictEqual([]);
  });

  it("should check if queue is empty", () => {
    const queue = new CustomQueue();

    expect(queue.isEmpty()).toBe(true);

    queue.enqueue(1);

    expect(queue.isEmpty()).toBe(false);
  });

  it("should peek data from queue", () => {
    const queue = new CustomQueue();

    expect(queue.peek()).toBeNull();

    queue.enqueue(1);
    queue.enqueue(2);

    expect(queue.peek()).toBe(1);
    expect(queue.peek()).toBe(1);
  });

  it("should be possible to enqueue/dequeue objects", () => {
    const queue = new CustomQueue();

    queue.enqueue({ value: "test1", key: "key1" });
    queue.enqueue({ value: "test2", key: "key2" });

    expect(queue).toStrictEqual([
      { value: "test1", key: "key1" },
      { value: "test2", key: "key2" },
    ]);

    expect(queue.dequeue()).toStrictEqual({ value: "test1", key: "key1" });
    expect(queue.dequeue().value).toBe("test2");
    expect(queue.isEmpty()).toBe(true);
  });
});
