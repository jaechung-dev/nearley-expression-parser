import { describe, it, expect } from "vitest";
import { parseExpression } from "./parseExpression";

describe("parseExpression", () => {
  it("parses a number literal", () => {
    const parsed = parseExpression("835085");
    expect(parsed.ok).toBe(true);
    expect(parsed.result).toBe(835085);
  });
});
