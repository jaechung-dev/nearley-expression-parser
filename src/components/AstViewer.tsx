import type { ASTNode } from "../parser/types";

type Props = {
  ast?: ASTNode;
  ok: boolean;
};

export function AstViewer({ ast, ok }: Props) {
  return (
    <section
      aria-labelledby="ast-heading"
      className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm"
    >
      <h2 id="ast-heading" className="text-xl font-semibold">
        Abstract Syntax Tree
      </h2>

      <pre
        tabIndex={0}
        className="mt-5 max-h-[640px] overflow-auto rounded-md bg-zinc-950 p-6 text-sm leading-relaxed text-zinc-100"
      >
        <code>{ok ? JSON.stringify(ast, null, 2) : "No AST"}</code>
      </pre>
    </section>
  );
}
