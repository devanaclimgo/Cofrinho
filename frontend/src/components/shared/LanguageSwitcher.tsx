import { useI18n } from "../../i18n/I18nContext";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Check, Languages } from "lucide-react";

function Flag({ code }: { code: "pt" | "en" }) {
  return (
    <span aria-hidden className="text-base leading-none">
      {code === "pt" ? "🇧🇷" : "🇺🇸"}
    </span>
  );
}

export function LanguageSwitcher({ variant = "ghost" }: { variant?: "ghost" | "outline" }) {
  const { locale, setLocale } = useI18n();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size="sm"
          className="h-9 gap-2 rounded-xl px-3"
          aria-label="Change language"
        >
          <Flag code={locale} />
          <span className="text-xs font-medium uppercase tracking-wide">{locale}</span>
          <Languages className="h-3.5 w-3.5 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44 rounded-xl">
        <DropdownMenuItem onSelect={() => setLocale("pt")} className="gap-2">
          <Flag code="pt" /> Português
          {locale === "pt" && <Check className="ml-auto h-4 w-4 text-primary" />}
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setLocale("en")} className="gap-2">
          <Flag code="en" /> English
          {locale === "en" && <Check className="ml-auto h-4 w-4 text-primary" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
