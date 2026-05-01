import { describe, expect, it } from "vitest";
import { parseExpression } from "./parseExpression";

describe("AST generation", () => {
  it("creates a number literal node", () => {
    const parsed = parseExpression("835085");
    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      expect(parsed.ast).toEqual({
        type: "NumberLiteral",
        value: 835085,
      });
    }
  });
  it("creates a binary expression node for addition", () => {
    const parsed = parseExpression("1 + 2");

    expect(parsed.ok).toBe(true);

    if (parsed.ok) {
      expect(parsed.ast).toEqual({
        type: "BinaryExpression",
        operator: "+",
        left: {
          type: "NumberLiteral",
          value: 1,
        },
        right: {
          type: "NumberLiteral",
          value: 2,
        },
      });
    }
  });

  it("creates a binary expression node for substraction", () => {
    const parsed = parseExpression("10 - 3");

    expect(parsed.ok).toBe(true);

    if (parsed.ok) {
      expect(parsed.ast).toEqual({
        type: "BinaryExpression",
        operator: "-",
        left: {
          type: "NumberLiteral",
          value: 10,
        },
        right: {
          type: "NumberLiteral",
          value: 3,
        },
      });
    }
  });
  it("creates nested binary expression nodes for precedence", () => {
    const parsed = parseExpression("1 + 2 * 3");

    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      expect(parsed.ast).toEqual({
        type: "BinaryExpression",
        operator: "+",
        left: {
          type: "NumberLiteral",
          value: 1,
        },
        right: {
          type: "BinaryExpression",
          operator: "*",
          left: {
            type: "NumberLiteral",
            value: 2,
          },
          right: {
            type: "NumberLiteral",
            value: 3,
          },
        },
      });
    }
  });
  it("creates comparison expression nodes", () => {
    const parsed = parseExpression("1 + 2 = 3");

    expect(parsed.ok).toBe(true);

    if (parsed.ok) {
      expect(parsed.ast).toEqual({
        type: "ComparisonExpression",
        operator: "=",
        left: {
          type: "BinaryExpression",
          operator: "+",
          left: {
            type: "NumberLiteral",
            value: 1,
          },
          right: {
            type: "NumberLiteral",
            value: 2,
          },
        },
        right: {
          type: "NumberLiteral",
          value: 3,
        },
      });
    }
  });
});
