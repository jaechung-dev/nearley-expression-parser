import nearley from "nearley";
import grammar from "./grammar.js";
import { evaluate } from "./evaluate";

export function parseExpression(input: string) {
  try {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    parser.feed(input);
    const ast = parser.results[0];

    return {
      ok: true,
      ast,
      result: evaluate(ast),
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Invalid expression",
    };
  }
}
