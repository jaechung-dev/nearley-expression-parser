export type NumberLiteralNode = {
  type: "NumberLiteral";
  value: number;
};

export type BinaryExpressionNode = {
  type: "BinaryExpression";
  operator: "+" | "-" | "*" | "/";
  left: ASTNode;
  right: ASTNode;
};

export type ComparisonExpressionNode = {
  type: "ComparisonExpression";
  operator: "=" | "!=";
  left: ASTNode;
  right: ASTNode;
};

export type ASTNode =
  | NumberLiteralNode
  | BinaryExpressionNode
  | ComparisonExpressionNode;
