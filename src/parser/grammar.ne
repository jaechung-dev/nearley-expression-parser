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

# temporary minimal grammar scaffold
Main -> %number {% d => d[0].value %}