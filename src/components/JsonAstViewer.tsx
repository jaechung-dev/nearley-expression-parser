import type { ASTNode } from "../parser/types";
import { Card } from "./Card";
import { SectionLegend } from "./SectionLegend";

type Props = {
  ast?: ASTNode;
  ok: boolean;
  className?: string;
};

export function JsonAstViewer({ ast, ok, className }: Props) {
  return (
    <Card className={className}>
      <SectionLegend>Abstract Syntax Tree</SectionLegend>
      <pre
        tabIndex={0}
        className="mt-5 h-[520px] overflow-auto rounded-md bg-zinc-950 p-6 font-mono text-sm leading-7 text-zinc-100"
      >
        <code>{ok ? JSON.stringify(ast, null, 2) : "No AST"}</code>
      </pre>
    </Card>
  );
}
