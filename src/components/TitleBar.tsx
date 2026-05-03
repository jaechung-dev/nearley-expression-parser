import { Card } from "./Card";

export function TitleBar() {
  return (
    <Card className="border-l-4 border-[rgb(237,28,36)]">
      <p className="text-sm uppercase tracking-wide text-[rgb(237,28,36)]">
        Nearley + Moo
      </p>

      <h1 className="mt-2 text-4xl font-semibold">Expression Parser</h1>

      <p className="mt-2 text-base">
        Parse mathematical expressions, inspect the AST, and evaluate boolean
        statements.
      </p>
    </Card>
  );
}
