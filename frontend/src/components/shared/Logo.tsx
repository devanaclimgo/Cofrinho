import { PiggyBank } from "lucide-react";
import { Link } from "react-router-dom";

export function Logo({ compact = false, className = "" }: { compact?: boolean; className?: string }) {
  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-2 font-semibold tracking-tight text-foreground ${className}`}
    >
      <span className="grid h-8 w-8 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
        <PiggyBank className="h-4 w-4" strokeWidth={2.5} />
      </span>
      {!compact && <span className="text-lg">Cofrinho</span>}
    </Link>
  );
}
