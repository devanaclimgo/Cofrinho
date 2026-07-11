import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { Sparkles, TrendingUp, ShieldCheck, Check } from "lucide-react"
import { useI18n } from "../../i18n/I18nContext"
import { Logo } from "../../components/shared/Logo"
import { ThemeToggle } from "../../components/shared/ThemeToggle"
import { LanguageSwitcher } from "../../components/shared/LanguageSwitcher"

export function AuthShell({ children }: { children: ReactNode }) {
  const { t } = useI18n()
  return (
    <div className="flex min-h-screen bg-background">
      {/* Left brand panel */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-primary p-12 text-primary-foreground lg:flex">
        <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-10" />
        <Link to="/" className="relative">
          <Logo inverted />
        </Link>
        <div className="relative">
          <Sparkles className="h-8 w-8" />
          <h2 className="mt-6 text-balance text-3xl font-bold leading-tight">{t("landing.hero.title")}</h2>
          <p className="mt-4 max-w-sm text-pretty leading-relaxed text-primary-foreground/80">{t("landing.hero.subtitle")}</p>
          <div className="mt-8 space-y-3">
            {[
              { icon: TrendingUp, text: t("landing.features.forecast.title") },
              { icon: ShieldCheck, text: t("landing.features.simulation.title") },
              { icon: Check, text: t("landing.features.tracking.title") },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3 text-sm">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-foreground/15">
                  <item.icon className="h-4 w-4" />
                </div>
                {item.text}
              </div>
            ))}
          </div>
        </div>
        <p className="relative text-sm text-primary-foreground/70">© 2026 Cofrinho</p>
      </div>

      {/* Right form panel */}
      <div className="flex w-full flex-col lg:w-1/2">
        <div className="flex items-center justify-between p-6">
          <Link to="/" className="lg:hidden">
            <Logo />
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center px-6 pb-12">
          <div className="w-full max-w-sm animate-fade-up">{children}</div>
        </div>
      </div>
    </div>
  )
}
