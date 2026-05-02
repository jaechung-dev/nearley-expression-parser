import { useMemo, useState } from "react";
import { parseExpression } from "./parser/parseExpression";
import { ExpressionInput } from "./components/ExpressionInput";
import { ResultPanel } from "./components/ResultPanel";
import { AstViewer } from "./components/AstViewer";

function App() {
  const [input, setInput] = useState("1 + 2 = 3");

  const parsed = useMemo(() => parseExpression(input), [input]);

  return (
    <main className="min-h-screen bg-zinc-100 px-6 py-10 text-[rgb(68,68,68)]">
      <section className="mx-auto max-w-5xl">
        <header className="mb-8 border-l-4 border-[rgb(237,28,36)] bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-wide text-[rgb(237,28,36)]">
            Nearley + Moo
          </p>
          <h1 className="mt-2 text-4xl font-semibold">Expression Parser</h1>
          <p className="mt-3 text-lg">
            Parse mathematical expressions, inspect the AST, and evaluate
            boolean statements.
          </p>
        </header>

        <section aria-label="Expression input section" className="mt-6">
          <ExpressionInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </section>

        <section
          aria-label="Parser output section"
          className="mt-6 grid gap-6 lg:grid-cols-[320px_1fr]"
        >
          <ResultPanel
            ok={parsed.ok}
            result={parsed.result}
            error={parsed.error}
          />

          <AstViewer ok={parsed.ok} ast={parsed.ast} />
        </section>
      </section>
    </main>
  );
}

export default App;
