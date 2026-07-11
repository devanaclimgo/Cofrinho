import { PiggyBank } from "lucide-react"
import { cn } from "../../lib/utils"

export function Logo({ className, showText = true, size = "md", inverted = false }: { className?: string; showText?: boolean; size?: "sm" | "md" | "lg"; inverted?: boolean }) {
  const box = size === "sm" ? "h-8 w-8" : size === "lg" ? "h-11 w-11" : "h-9 w-9"
  const icon = size === "sm" ? "h-4 w-4" : size === "lg" ? "h-6 w-6" : "h-5 w-5"
  const text = size === "sm" ? "text-base" : size === "lg" ? "text-xl" : "text-lg"

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div
        className={cn(
          "flex items-center justify-center rounded-xl shadow-soft",
          inverted ? "bg-primary-foreground text-primary" : "bg-primary text-primary-foreground",
          box,
        )}
      >
        <PiggyBank className={icon} />
      </div>
      {showText && (
        <span className={cn("font-bold tracking-tight", inverted ? "text-primary-foreground" : "text-foreground", text)}>
          Cofrinho
        </span>
      )}
    </div>
  )
}
