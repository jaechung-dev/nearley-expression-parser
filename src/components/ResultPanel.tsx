type Props = {
  ok: boolean;
  result?: number | boolean;
  error?: string;
};

export function ResultPanel({ ok, result, error }: Props) {
  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
      <header>
        <h2 className="text-lg font-semibold">Result</h2>
      </header>
      <pre
        className={`mt-4 rounded-md p-4 font-mono text-lg ${
          ok ? "bg-zinc-100 text-zinc-900" : "bg-red-50 text-[rgb(237,28,36)]"
        }`}
      >
        {ok ? String(result) : error}
      </pre>
    </section>
  );
}
