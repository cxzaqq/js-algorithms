import DoublyLinkedListNode from "../DoublyLinkedListNode";

describe("DoublyLinkedListNode", () => {
  it("should create list node with value", () => {
    const node = new DoublyLinkedListNode(1);

    expect(node.value).toBe(1);
    expect(node.next).toBeNull();
    expect(node.previous).toBeNull();
  });

  it("should create list node with object as a value", () => {
    const nodeValue = { value: 1, key: "test" };
    const node = new DoublyLinkedListNode(nodeValue);

    expect(node.value.value).toBe(1);
    expect(node.value.key).toBe("test");
    expect(node.next).toBeNull();
    expect(node.previous).toBeNull();
  });

  it("should convert node to string", () => {
    const node = new DoublyLinkedListNode(1);

    expect(node.toString()).toBe("1");

    node.value = "string value";
    expect(node.toString()).toBe("string value");
  });

  it("should convert node to string with custom stirngifier", () => {
    const nodeValue = { value: 1, key: "test" };
    const node = new DoublyLinkedListNode(nodeValue);
    const toStringCallback = (value) =>
      `value: ${value.value}, key: ${value.key}`;

    expect(node.toString(toStringCallback)).toBe("value: 1, key: test");
  });
});
