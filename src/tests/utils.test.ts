import { add } from "../utils/functions";

describe("add func", () => {
  it("should add two numbers together", () => {
    expect(add(3, 6)).toBe(9);
  });
});
