import { describe, expect, it } from "vitest";
import { parseExpression } from "./parseExpression";
import { normalizedAstTestCases } from "./testCases";

describe("AST generation", () => {
  it.each(normalizedAstTestCases)("$label", ({ expression }) => {
    const parsed = parseExpression(expression);

    expect(parsed.ok).toBe(true);

    if (parsed.ok) {
      expect(parsed.ast).toMatchSnapshot();
    }
  });
});
