import type { ASTNode } from "../parser/types";

type Props = {
  ast?: ASTNode;
  ok: boolean;
};

export function AstViewer({ ast, ok }: Props) {
  return (
    <div>
      <h2>AST</h2>
      {ok ? <pre>{JSON.stringify(ast, null, 2)}</pre> : <pre>No AST</pre>}
    </div>
  );
}
