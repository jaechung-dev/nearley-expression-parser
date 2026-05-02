import { useMemo, useState } from "react";
import { parseExpression } from "./parser/parseExpression";
import { ExpressionInput } from "./components/ExpressionInput";
import { ResultPanel } from "./components/ResultPanel";
import { AstViewer } from "./components/AstViewer";

function App() {
  const [input, setInput] = useState("1 + 2 = 3");

  const parsed = useMemo(() => parseExpression(input), [input]);

  return (
    <main>
      <h1>Expression Parser</h1>

      <ExpressionInput
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <ResultPanel ok={parsed.ok} result={parsed.result} error={parsed.error} />

      <AstViewer ok={parsed.ok} ast={parsed.ast} />
    </main>
  );
}

export default App;
