import type { ASTNode } from "../parser/types";
import { Card } from "./Card";
import { AstTree } from "./AstTree";
import { SectionLegend } from "./SectionLegend";

type Props = {
  ast?: ASTNode;
  ok: boolean;
  className?: string;
};

export function VisualAstViewer({ ast, ok, className }: Props) {
  return (
    <Card className={className}>
      <SectionLegend>Visual AST Tree</SectionLegend>
      <section className="h-[520px] overflow-auto rounded-md bg-zinc-950 p-6 font-mono text-sm leading-7 text-zinc-100">
        {ok && ast ? (
          <ul>
            <AstTree node={ast} />
          </ul>
        ) : (
          <p className="text-zinc-500">No AST available</p>
        )}
      </section>
    </Card>
  );
}
