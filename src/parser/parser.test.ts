import { describe, expect, it } from "vitest";

import { normalizedTestCases } from "./testCases";

import { parseExpression } from "./parseExpression";

describe("parseExpression", () => {
  it.each(normalizedTestCases)(
    "$label",
    ({ expression, expected, shouldFail }) => {
      const parsed = parseExpression(expression);

      if (shouldFail) {
        expect(parsed.ok).toBe(false);
        return;
      }

      expect(parsed.ok).toBe(true);

      if (Number.isNaN(expected)) {
        expect(parsed.result).toBeNaN();
      } else {
        expect(parsed.result).toBe(expected);
      }
    },
  );
});
