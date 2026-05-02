import type { ChangeEvent } from "react";

type Props = {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function ExpressionInput({ value, onChange }: Props) {
  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
      <label className="mb-2 block text-sm font-semibold uppercase tracking-wide">
        Expression
      </label>

      <input
        className="w-full rounded-md border border-zinc-300 px-4 py-3 font-mono text-lg outline-none focus:border-[rgb(237,28,36)]"
        value={value}
        onChange={onChange}
        placeholder="1 + 2 = 3"
      />
    </section>
  );
}
