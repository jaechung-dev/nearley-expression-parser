@{%
// let Vite scan
const moo = require("moo");

// lexer converts raw input string into tokens
const lexer = moo.compile({

  // whitespace tokens
  WS: { match: /[ \t\n\r]+/, lineBreaks: true },

  // numeric literals
  number: /[0-9]+/,

  // exponentiation operator
  power: "**",

  // arithmetic operators
  plus: "+",
  minus: "-",
  times: "*",
  divide: "/",

  // comparison operators
  eq: "=",
  neq: "!=",

  // grouping symbols
  lparen: "(",
  rparen: ")",
});

// automatically skip whitespace tokens
lexer.next = (next => () => {
  let tok;

  while ((tok = next.call(lexer)) && tok.type === "WS") {}

  return tok;
})(lexer.next);

%}

@lexer lexer

# entry point
Main -> Comparison {% d => d[0] %}

# comparison expressions
Comparison
  -> Expression %eq Expression
     {% d => ({
       type: "ComparisonExpression",
       operator: "=",
       left: d[0],
       right: d[2],
     }) %}

  | Expression %neq Expression
     {% d => ({
       type: "ComparisonExpression",
       operator: "!=",
       left: d[0],
       right: d[2],
     }) %}

  | Expression {% d => d[0] %}

Expression
  # additive expression
  -> Expression %plus Term
     {% d => ({
       type: "BinaryExpression",
       operator: "+",
       left: d[0],
       right: d[2],
     }) %}

  # subtractive expression
  | Expression %minus Term
     {% d => ({
       type: "BinaryExpression",
       operator: "-",
       left: d[0],
       right: d[2],
     }) %}

  | Term {% d => d[0] %}

Term
  # multiplicative expression
  -> Term %times Power
     {% d => ({
       type: "BinaryExpression",
       operator: "*",
       left: d[0],
       right: d[2],
     }) %}

  # division expression
  | Term %divide Power
     {% d => ({
       type: "BinaryExpression",
       operator: "/",
       left: d[0],
       right: d[2],
     }) %}

  | Power {% d => d[0] %}

Power
  # right-associative exponentiation
  -> Unary %power Power
     {% d => ({
       type: "BinaryExpression",
       operator: "**",
       left: d[0],
       right: d[2],
     }) %}
  | Unary {% d => d[0] %}

Unary
  -> %minus Unary
     {% d => ({
       type: "UnaryExpression",
       operator: "-",
       argument: d[1],
     }) %}
  | %plus Unary
     {% d => ({
       type: "UnaryExpression",
       operator: "+",
       argument: d[1],
     }) %}

  | Factor {% d => d[0] %}

Factor
  -> %number
     {% d => ({
       type: "NumberLiteral",
       value: Number(d[0].value),
     }) %}

  # grouped expression
  | %lparen Comparison %rparen {% d => d[1] %}