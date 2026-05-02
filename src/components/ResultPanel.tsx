type Props = {
  ok: boolean;
  result?: number | boolean;
  error?: string;
};

export function ResultPanel({ ok, result, error }: Props) {
  return (
    <div>
      <h2>Result</h2>
      {ok ? <pre>{String(result)}</pre> : <pre>{error}</pre>}
    </div>
  );
}
