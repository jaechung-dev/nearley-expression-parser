// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const moo = require("moo");

const lexer = moo.compile({
  WS: { match: /[ \t\n\r]+/, lineBreaks: true },
  number: /[0-9]+/,
});
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "Main", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": d => d[0].value}
]
  , ParserStart: "Main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
