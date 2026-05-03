import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: Props) {
  return (
    <article
      className={`rounded-lg border border-zinc-200 bg-white p-6 shadow-sm ${className}`}
    >
      {children}
    </article>
  );
}
