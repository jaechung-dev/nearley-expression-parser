import nearley from "nearley";
import grammar from "./grammar.js";

export function parseExpression(input: string) {
  try {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    parser.feed(input);

    return {
      ok: true,
      result: parser.results[0],
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Invalid expression",
    };
  }
}
