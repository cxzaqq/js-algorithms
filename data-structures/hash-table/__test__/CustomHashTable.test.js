import CustomHashTable from "../CustomHashTable";

describe("CustomHashTable", () => {
  it("should create hash table of certain size", () => {
    const defaultHashTable = new CustomHashTable();
    expect(defaultHashTable.buckets.length).toBe(32);

    const biggerHashTable = new CustomHashTable(64);
    expect(biggerHashTable.buckets.length).toBe(64);
  });

  it("should generate proper hash for specified keys", () => {
    const hashTable = new CustomHashTable();

    expect(hashTable.hash("a")).toBe(1);
    expect(hashTable.hash("b")).toBe(2);
    expect(hashTable.hash("abc")).toBe(6);
  });

  it("should set, read and delete data with collisions", () => {
    const hashTable = new CustomHashTable(3);

    expect(hashTable.hash("a")).toBe(1);
    expect(hashTable.hash("b")).toBe(2);
    expect(hashTable.hash("c")).toBe(0);
    expect(hashTable.hash("d")).toBe(1);

    hashTable.set("a", "sky-old");
    hashTable.set("a", "sky");
    hashTable.set("b", "sea");
    hashTable.set("c", "earth");
    hashTable.set("d", "ocean");

    expect(hashTable.get("a")).toBe("sky");
    expect(hashTable.get("b")).toBe("sea");
    expect(hashTable.get("c")).toBe("earth");
    expect(hashTable.get("d")).toBe("ocean");
    expect(hashTable.get("x")).toBeNull();

    expect(hashTable.delete("a")).toStrictEqual([["a", "sky"]]);
    expect(hashTable.get("a")).toBeNull();
    expect(hashTable.delete("a")).toBeNull();
  });

  it("should be possible to add objects to hash table", () => {
    const hashTable = new CustomHashTable();

    hashTable.set("objectKey", { prop1: "a", prop2: "b" });

    const object = hashTable.get("objectKey");
    expect(object).toBeDefined();
    expect(object.prop1).toBe("a");
    expect(object.prop2).toBe("b");
  });
});
