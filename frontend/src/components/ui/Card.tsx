import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function Card({ children }: Props) {
  return (
    <div className="bg-card rounded-2xl shadow-sm p-4 transition hover:shadow-md">
      {children}
    </div>
  );
}