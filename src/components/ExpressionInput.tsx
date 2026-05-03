import type { ChangeEvent } from "react";
import { Card } from "./Card";
import { SectionLegend } from "./SectionLegend";

type Props = {
  value: string;
  resultText: string;
  isValid: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function ExpressionInput({
  value,
  resultText,
  onChange,
  isValid,
}: Props) {
  return (
    <Card>
      <fieldset className="grid gap-4 md:grid-cols-2">
        <legend>
          <SectionLegend>Expression</SectionLegend>
        </legend>

        <input
          id="expression-input"
          className="rounded-md border border-zinc-300 px-4 py-3 font-mono text-lg outline-none focus:border-[rgb(237,28,36)]"
          value={value}
          onChange={onChange}
          placeholder="1 + 2 = 3"
        />

        <output
          className={`block rounded-md border px-4 py-3 font-mono text-lg font-semibold ${
            isValid
              ? "border-blue-200 bg-blue-50 text-blue-700"
              : "border-red-200 bg-red-50 text-red-600"
          }`}
        >
          {resultText}
        </output>
      </fieldset>
    </Card>
  );
}
