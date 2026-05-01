@{%
const moo = require("moo");

// lexer converts raw input string into tokens
const lexer = moo.compile({

  // whitespace tokens
  WS: { match: /[ \t\n\r]+/, lineBreaks: true },
  
  // numeric literals
  number: /[0-9]+/,

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

# comparison expression
Comparison
  -> Expression %eq Expression {% d => d[0] === d[2] %}
  | Expression %neq Expression {% d => d[0] !== d[2] %}
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
  # multiplicative term
  -> Term %times Factor
     {% d => ({
       type: "BinaryExpression",
       operator: "*",
       left: d[0],
       right: d[2],
     }) %}
  # division term
  | Term %divide Factor
     {% d => ({
       type: "BinaryExpression",
       operator: "/",
       left: d[0],
       right: d[2],
     }) %}
  | Factor {% d => d[0] %}

# atomic expression
Factor
    -> %number
     {% d => ({
       type: "NumberLiteral",
       value: Number(d[0].value),
     }) %}
  # grouped expression
  | %lparen Expression %rparen {% d => d[1] %}