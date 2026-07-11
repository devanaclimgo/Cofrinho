import { Moon, Sun } from "lucide-react"
import { useTheme } from "../../lib/ThemeContext"
import { cn } from "../../lib/utils"

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, toggleTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-secondary focus-ring",
        className,
      )}
      aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
    >
      <Sun className={cn("h-4.5 w-4.5 transition-all duration-300", isDark ? "scale-0 -rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100", "h-[18px] w-[18px]")} />
      <Moon className={cn("absolute h-[18px] w-[18px] transition-all duration-300", isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-90 opacity-0")} />
    </button>
  )
}
