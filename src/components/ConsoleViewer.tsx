import { useState } from "react";

import { Card } from "./Card";
import { SectionLegend } from "./SectionLegend";

import {
  normalizedAstTestCases,
  normalizedTestCases,
} from "../parser/testCases";

import { parseExpression } from "../parser/parseExpression";

const parserOutput = normalizedTestCases.map(
  ({ label, expression, expected, shouldFail }) => {
    const parsed = parseExpression(expression);

    const passed = shouldFail
      ? !parsed.ok
      : parsed.ok &&
        (Number.isNaN(expected)
          ? Number.isNaN(parsed.result)
          : parsed.result === expected);

    return {
      label,
      passed,
    };
  },
);

export function ConsoleViewer() {
  const [activeTab, setActiveTab] = useState<"parser" | "ast">("parser");

  const isParserTab = activeTab === "parser";

  return (
    <Card className="mt-5">
      <article className="rounded-md bg-black p-5">
        <header className="mb-4 flex items-center justify-between">
          <SectionLegend>
            <span className="font-mono text-emerald-400">TEST CONSOLE</span>
          </SectionLegend>

          <nav aria-label="Test console tabs" className="flex gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("parser")}
              className={`rounded px-3 py-1 font-mono text-xs ${
                activeTab === "parser"
                  ? "bg-emerald-400 text-black"
                  : "border border-emerald-500/40 text-emerald-400"
              }`}
            >
              Parser
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("ast")}
              className={`rounded px-3 py-1 font-mono text-xs ${
                activeTab === "ast"
                  ? "bg-emerald-400 text-black"
                  : "border border-emerald-500/40 text-emerald-400"
              }`}
            >
              AST
            </button>
          </nav>
        </header>

        <section
          tabIndex={0}
          className="max-h-[220px] overflow-auto font-mono text-sm leading-7"
        >
          {isParserTab
            ? parserOutput.map(({ label, passed }, index) => (
                <p key={`${label}-${index}`}>
                  <span
                    className={passed ? "text-emerald-400" : "text-red-400"}
                  >
                    {passed ? "✓" : "✗"}
                  </span>

                  <span className="ml-2 text-emerald-400">{label}</span>
                </p>
              ))
            : normalizedAstTestCases.map(({ label }, index) => (
                <p key={`${label}-${index}`}>
                  <span className="text-emerald-400">✓</span>

                  <span className="ml-2 text-emerald-400">{label}</span>
                </p>
              ))}
        </section>
      </article>
    </Card>
  );
}
