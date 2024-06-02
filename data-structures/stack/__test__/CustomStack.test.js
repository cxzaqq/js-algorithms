import CustomStack from "../CustomStack";

describe("CustomStack", () => {
  it("should create empty stack", () => {
    const stack = new CustomStack();
    expect(stack).not.toBeNull();
    expect(stack).toStrictEqual([]);
  });

  it("should stack data to stack", () => {
    const stack = new CustomStack();

    stack.push(1);
    stack.push(2);

    expect(stack).toStrictEqual([1, 2]);
  });

  it("should pop data to stack", () => {
    const stack = new CustomStack();

    stack.push(1);
    stack.push(2);

    expect(stack.pop()).toBe(2);
    expect(stack.pop()).toBe(1);
    expect(stack).toStrictEqual([]);
  });

  it("should check if stack is empty", () => {
    const stack = new CustomStack();

    expect(stack.isEmpty()).toBe(true);

    stack.push(1);

    expect(stack.isEmpty()).toBe(false);
  });

  it("should be possible to push/pop objects", () => {
    const stack = new CustomStack();

    stack.push({ value: "test1", key: "key1" });
    stack.push({ value: "test2", key: "key2" });

    expect(stack).toStrictEqual([
      { value: "test1", key: "key1" },
      { value: "test2", key: "key2" },
    ]);

    expect(stack.pop()).toStrictEqual({ value: "test2", key: "key2" });
    expect(stack.pop().value).toBe("test1");
    expect(stack.isEmpty()).toBe(true);
  });
});
