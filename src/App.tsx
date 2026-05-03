import { useMemo, useState } from "react";
import { parseExpression } from "./parser/parseExpression";
import { ExpressionInput } from "./components/ExpressionInput";
import { JsonAstViewer } from "./components/JsonAstViewer";
import { VisualAstViewer } from "./components/VisualAstViewer";
import { ConsoleViewer } from "./components/ConsoleViewer";
import { TitleBar } from "./components/TitleBar";

function App() {
  const [input, setInput] = useState("1 + 2 = 3");

  const parsed = useMemo(() => parseExpression(input), [input]);

  return (
    <main className="min-h-screen bg-zinc-100 px-6 py-8 text-[rgb(68,68,68)]">
      <section className="mx-auto max-w-6xl">
        <TitleBar />

        <section aria-label="Expression input and result" className="mt-5">
          <ExpressionInput
            value={input}
            resultText={
              parsed.ok ? String(parsed.result) : "Invalid expression"
            }
            isValid={parsed.ok}
            onChange={(event) => setInput(event.target.value)}
          />
        </section>

        {!parsed.ok && (
          <section
            aria-live="polite"
            className="mt-4 rounded-md border border-red-200 bg-red-50 p-4 font-mono text-sm font-semibold whitespace-pre-wrap text-[rgb(237,28,36)]"
          >
            {parsed.error}
          </section>
        )}

        <section
          aria-label="AST inspection section"
          className="mt-5 flex flex-col gap-5 xl:flex-row"
        >
          <JsonAstViewer
            className="min-w-[420px] shrink-0  flex-1"
            ok={parsed.ok}
            ast={parsed.ast}
          />
          <VisualAstViewer
            className="min-w-[420px] shrink-0  flex-1"
            ok={parsed.ok}
            ast={parsed.ast}
          />
        </section>

        <ConsoleViewer />
      </section>
    </main>
  );
}

export default App;
