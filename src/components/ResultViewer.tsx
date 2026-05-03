import { Card } from "./Card";
import { SectionLegend } from "./SectionLegend";

type Props = {
  ok: boolean;
  result?: number | boolean;
  error?: string;
};

export function ResultViewer({ ok, result, error }: Props) {
  return (
    <Card>
      <SectionLegend>Result</SectionLegend>

      <output
        className={`mt-4 block rounded-md p-4 font-mono text-sm leading-relaxed ${
          ok
            ? "bg-zinc-100 text-zinc-900"
            : "border border-red-200 bg-red-50 font-semibold text-[rgb(237,28,36)]"
        }`}
      >
        {ok ? String(result) : error}
      </output>
    </Card>
  );
}
