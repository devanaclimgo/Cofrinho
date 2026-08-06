import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  fullScreen?: boolean;
  label?: string;
  className?: string;
}

export default function LoadingState({
  fullScreen = false,
  label,
  className = "",
}: LoadingStateProps) {
  return (
    <div
      className={`flex items-center justify-center px-6 ${
        fullScreen ? "min-h-dvh" : "min-h-[240px] py-16"
      } ${className}`}
    >
      <div className="flex flex-col items-center gap-4 animate-fade-in-up">
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-primary/10 text-primary">
          <Loader2 className="h-7 w-7 animate-spin" strokeWidth={2.25} />
        </div>
        {label && (
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
        )}
      </div>
    </div>
  );
}