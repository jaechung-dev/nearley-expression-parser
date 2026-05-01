@{%
const moo = require("moo");

const lexer = moo.compile({
  WS: { match: /[ \t\n\r]+/, lineBreaks: true },
  number: /[0-9]+/,
});
%}

@lexer lexer

Main -> %number {% d => d[0].value %}