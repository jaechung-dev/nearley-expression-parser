import nearley from "nearley";
import grammar from "./grammar.js";

export function parseExpression(input: string) {
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
  parser.feed(input);
  return {
    ok: true,
    result: parser.results[0],
  };
}
