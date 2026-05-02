import nearley from "nearley";
import * as grammar from "./grammar";
import { evaluate } from "./evaluate";

const compiledGrammar = grammar.default ?? grammar;

export function parseExpression(input: string) {
  try {
    const parser = new nearley.Parser(
      nearley.Grammar.fromCompiled(compiledGrammar),
    );

    parser.feed(input);
    const ast = parser.results[0];

    return {
      ok: true,
      ast,
      result: evaluate(ast),
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Invalid expression";
    // remove verbose Nearley expectation dump
    const customError = message.split("Instead, I was expecting")[0].trim();

    return {
      ok: false,
      error: customError,
    };
  }
}
