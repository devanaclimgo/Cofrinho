import { useTheme } from "../../lib/ThemeContext"
import { Button } from "../../components/ui/button";
import { Moon, Sun, Monitor } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

export function ThemeToggle() {
  const { theme, setTheme, resolved } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Toggle theme" className="h-9 w-9 rounded-xl">
          {resolved === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 rounded-xl">
        <DropdownMenuItem onSelect={() => setTheme("light")} className="gap-2">
          <Sun className="h-4 w-4" /> Light {theme === "light" && "·"}
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setTheme("dark")} className="gap-2">
          <Moon className="h-4 w-4" /> Dark {theme === "dark" && "·"}
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setTheme("system")} className="gap-2">
          <Monitor className="h-4 w-4" /> System {theme === "system" && "·"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
