import type { ASTNode } from "../parser/types";

type Props = {
  node: ASTNode;
};

export function AstTree({ node }: Props) {
  if (node.type === "NumberLiteral") {
    return (
      <li>
        <span className="text-emerald-400">NumberLiteral</span>{" "}
        <span className="text-zinc-300">({node.value})</span>
      </li>
    );
  }

  if (node.type === "UnaryExpression") {
    return (
      <li>
        <span className="text-cyan-400">UnaryExpression</span>{" "}
        <span className="text-zinc-300">({node.operator})</span>
        <ul className="ml-6 mt-2 border-l-2 border-zinc-500 pl-4">
          <AstTree node={node.argument} />
        </ul>
      </li>
    );
  }

  if (
    node.type === "BinaryExpression" ||
    node.type === "ComparisonExpression"
  ) {
    return (
      <li>
        <span className="text-yellow-400">{node.type}</span>{" "}
        <span className="text-zinc-300">({node.operator})</span>
        <ul className="ml-6 mt-2 border-l-2 border-zinc-500 pl-4">
          <AstTree node={node.left} />
          <AstTree node={node.right} />
        </ul>
      </li>
    );
  }

  return null;
}
