import { describe, it, expect } from "vitest";
import { parseExpression } from "./parseExpression";

describe("parseExpression", () => {
  it("parses a number literal", () => {
    const parsed = parseExpression("835085");
    expect(parsed.ok).toBe(true);
    expect(parsed.result).toBe(835085);
  });

  it("parses additive expression", () => {
    const parsed = parseExpression("1+2");
    expect(parsed.ok).toBe(true);
    expect(parsed.result).toBe(3);
  });

  it("applies multiplication before addition", () => {
    const parsed = parseExpression("2 * 3 + 4");
    expect(parsed.ok).toBe(true);
    expect(parsed.result).toBe(10);
  });

  it("supports subtraction", () => {
    const parsed = parseExpression("10 - 3");
    expect(parsed.ok).toBe(true);
    expect(parsed.result).toBe(7);
  });

  it("supports division", () => {
    const parsed = parseExpression("10 / 2 + 1");
    expect(parsed.ok).toBe(true);
    expect(parsed.result).toBe(6);
  });

  it("supports parentheses", () => {
    const parsed = parseExpression("2*(3+4)");
    expect(parsed.ok).toBe(true);
    expect(parsed.result).toBe(14);
  });

  it("evaluates equality comparison", () => {
    const parsed = parseExpression("1+2=3");

    expect(parsed.ok).toBe(true);
    expect(parsed.result).toBe(true);
  });

  it("evaluates inequality comparison", () => {
    const parsed = parseExpression("2+3*2=10");

    expect(parsed.ok).toBe(true);
    expect(parsed.result).toBe(false);
  });
});
