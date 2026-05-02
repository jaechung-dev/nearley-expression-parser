import type { ASTNode } from "./types";

export function evaluate(node: ASTNode): number | boolean {
  if (node.type === "NumberLiteral") {
    return node.value;
  }

  if (node.type === "BinaryExpression") {
    const left = evaluate(node.left) as number;
    const right = evaluate(node.right) as number;

    if (node.operator === "+") return left + right;
    if (node.operator === "-") return left - right;
    if (node.operator === "*") return left * right;
    if (node.operator === "/") return left / right;
    if (node.operator === "**") return left ** right;
  }

  if (node.type === "UnaryExpression") {
    const value = evaluate(node.argument) as number;

    if (node.operator === "-") return -value;
    if (node.operator === "+") return +value;
  }

  if (node.type === "ComparisonExpression") {
    const left = evaluate(node.left);
    const right = evaluate(node.right);

    if (node.operator === "=") return left === right;
    if (node.operator === "!=") return left !== right;
  }

  throw new Error("Unknown AST node");
}
