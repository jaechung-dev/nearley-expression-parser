import type { ChangeEvent } from "react";

type Props = {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function ExpressionInput({ value, onChange }: Props) {
  return (
    <div>
      <label>Expression</label>
      <input value={value} onChange={onChange} placeholder="1 + 2 = 3" />
    </div>
  );
}
