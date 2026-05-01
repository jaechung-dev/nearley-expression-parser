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
Main -> Expression {% d => d[0] %}

# additive expression
Expression
  -> Expression %plus Term {% d => d[0] + d[2] %}
  | Term {% d => d[0] %}

# lowest unit for now
Term
  -> %number {% d => Number(d[0].value) %}