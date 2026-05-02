import { describe, expect, it } from "vitest";
import { parseExpression } from "./parseExpression";

describe("parseExpression", () => {
  describe("arithmetic expressions", () => {
    it("parses a number literal", () => {
      const parsed = parseExpression("835085");
      expect(parsed.ok).toBe(true);
      expect(parsed.result).toBe(835085);
    });

    it("supports addition", () => {
      const parsed = parseExpression("1+2");
      expect(parsed.ok).toBe(true);
      expect(parsed.result).toBe(3);
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

    it("applies multiplication before addition", () => {
      const parsed = parseExpression("2 * 3 + 4");
      expect(parsed.ok).toBe(true);
      expect(parsed.result).toBe(10);
    });
  });

  describe("grouped expressions", () => {
    it("supports parentheses", () => {
      const parsed = parseExpression("2*(3+4)");
      expect(parsed.ok).toBe(true);
      expect(parsed.result).toBe(14);
    });

    it("uses parentheses to override precedence", () => {
      const parsed = parseExpression("2 * (3 + 4)");
      expect(parsed.ok).toBe(true);
      expect(parsed.result).toBe(14);
    });
  });

  describe("comparison expressions", () => {
    it("evaluates 1 + 2 = 3 as true", () => {
      const parsed = parseExpression("1 + 2 = 3");
      expect(parsed.ok).toBe(true);
      expect(parsed.result).toBe(true);
    });

    it("evaluates 2 * 3 + 4 = 10 as true", () => {
      const parsed = parseExpression("2 * 3 + 4 = 10");
      expect(parsed.ok).toBe(true);
      expect(parsed.result).toBe(true);
    });

    it("evaluates 2 * (3 + 4) = 10 as false", () => {
      const parsed = parseExpression("2 * (3 + 4) = 10");
      expect(parsed.ok).toBe(true);
      expect(parsed.result).toBe(false);
    });

    it("evaluates 6 = 10 / 2 + 1 as true", () => {
      const parsed = parseExpression("6 = 10 / 2 + 1");
      expect(parsed.ok).toBe(true);
      expect(parsed.result).toBe(true);
    });

    it("evaluates 12 + 3 != 4 / 2 + 5 as true", () => {
      const parsed = parseExpression("12 + 3 != 4 / 2 + 5");
      expect(parsed.ok).toBe(true);
      expect(parsed.result).toBe(true);
    });

    it("evaluates 2 + 3 * 2 = 10 as false", () => {
      const parsed = parseExpression("2 + 3 * 2 = 10");
      expect(parsed.ok).toBe(true);
      expect(parsed.result).toBe(false);
    });

    it("evaluates 2 * 3 + 4 != 10 as false", () => {
      const parsed = parseExpression("2 * 3 + 4 != 10");
      expect(parsed.ok).toBe(true);
      expect(parsed.result).toBe(false);
    });
  });

  describe("invalid expressions", () => {
    it("returns failure for incomplete grouped expression", () => {
      const parsed = parseExpression("1 + (2 = 3");
      expect(parsed.ok).toBe(false);
    });
  });

  describe("additional robustness cases", () => {
    it("handles left-associative division", () => {
      const parsed = parseExpression("10 / 2 / 5");

      expect(parsed.ok).toBe(true);

      expect(parsed.result).toBe(1);
    });

    it("follows JavaScript numeric semantics for division by zero", () => {
      const parsed = parseExpression("10 / 0");

      expect(parsed.ok).toBe(true);
      expect(parsed.result).toBe(Infinity);
    });

    it("follows JavaScript numeric semantics for zero divided by zero", () => {
      const parsed = parseExpression("0 / 0");

      expect(parsed.ok).toBe(true);
      expect(parsed.result).toBeNaN();
    });
  });

  describe("exponentiation operator", () => {
    it("supports exponentiation", () => {
      const parsed = parseExpression("2 ** 3");

      expect(parsed.ok).toBe(true);
      expect(parsed.result).toBe(8);
    });

    it("applies exponentiation before multiplication", () => {
      const parsed = parseExpression("2 * 3 ** 2");

      expect(parsed.ok).toBe(true);
      expect(parsed.result).toBe(18);
    });

    it("treats exponentiation as right-associative", () => {
      const parsed = parseExpression("2 ** 3 ** 2");

      expect(parsed.ok).toBe(true);
      expect(parsed.result).toBe(512);
    });
  });
  describe("unary operators", () => {
    it("supports unary minus", () => {
      const parsed = parseExpression("-5 + 2");

      expect(parsed.ok).toBe(true);
      expect(parsed.result).toBe(-3);
    });

    it("supports unary plus", () => {
      const parsed = parseExpression("+5 + 2");

      expect(parsed.ok).toBe(true);
      expect(parsed.result).toBe(7);
    });

    it("supports unary operator with grouped expressions", () => {
      const parsed = parseExpression("-(2 + 3)");

      expect(parsed.ok).toBe(true);
      expect(parsed.result).toBe(-5);
    });

    it("supports exponentiation with negative exponent", () => {
      const parsed = parseExpression("5 ** -2");

      expect(parsed.ok).toBe(true);
      expect(parsed.result).toBe(0.04);
    });
  });
});
