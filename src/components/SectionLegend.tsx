import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function SectionLegend({ children }: Props) {
  return (
    <header className="mb-4">
      <h2 className="text-2xl font-semibold">{children}</h2>
    </header>
  );
}
