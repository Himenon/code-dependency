import { createRepository } from "../Repository";

describe("LocalStorageのテスト", () => {
  const prefixName = "test-repository";
  const repository = createRepository(prefixName);

  test("create/read", () => {
    repository.saveItem("sample", "test value");
    const value = repository.getItem("sample");
    expect(value).toBe("test value");
  });

  test("create/delete", () => {
    repository.saveItem("sample1", "test value");
    const value = repository.removeItem("sample1");
    expect(value).toBe(undefined);
  });
});
