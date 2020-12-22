import { createStore } from "./createStore";

describe("test", () => {
  test("test", () => {
    const store = createStore(() => {}, {});
    expect(store).toBeDefined();
  });
});
