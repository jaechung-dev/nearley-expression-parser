// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

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

var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "Main", "symbols": ["Comparison"], "postprocess": d => d[0]},
    {"name": "Comparison", "symbols": ["Expression", (lexer.has("eq") ? {type: "eq"} : eq), "Expression"], "postprocess":  d => ({
          type: "ComparisonExpression",
          operator: "=",
          left: d[0],
          right: d[2],
        }) },
    {"name": "Comparison", "symbols": ["Expression", (lexer.has("neq") ? {type: "neq"} : neq), "Expression"], "postprocess":  d => ({
          type: "ComparisonExpression",
          operator: "!=",
          left: d[0],
          right: d[2],
        }) },
    {"name": "Comparison", "symbols": ["Expression"], "postprocess": d => d[0]},
    {"name": "Expression", "symbols": ["Expression", (lexer.has("plus") ? {type: "plus"} : plus), "Term"], "postprocess":  d => ({
             type: "BinaryExpression",
             operator: "+",
             left: d[0],
             right: d[2],
        }) },
    {"name": "Expression", "symbols": ["Expression", (lexer.has("minus") ? {type: "minus"} : minus), "Term"], "postprocess":  d => ({
             type: "BinaryExpression",
             operator: "-",
             left: d[0],
             right: d[2],
        }) },
    {"name": "Expression", "symbols": ["Term"], "postprocess": d => d[0]},
    {"name": "Term", "symbols": ["Term", (lexer.has("times") ? {type: "times"} : times), "Factor"], "postprocess":  d => ({
          type: "BinaryExpression",
          operator: "*",
          left: d[0],
          right: d[2],
        }) },
    {"name": "Term", "symbols": ["Term", (lexer.has("divide") ? {type: "divide"} : divide), "Factor"], "postprocess":  d => ({
          type: "BinaryExpression",
          operator: "/",
          left: d[0],
          right: d[2],
        }) },
    {"name": "Term", "symbols": ["Factor"], "postprocess": d => d[0]},
    {"name": "Factor", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess":  d => ({
          type: "NumberLiteral",
          value: Number(d[0].value),
        }) },
    {"name": "Factor", "symbols": [(lexer.has("lparen") ? {type: "lparen"} : lparen), "Expression", (lexer.has("rparen") ? {type: "rparen"} : rparen)], "postprocess": d => d[1]}
]
  , ParserStart: "Main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
