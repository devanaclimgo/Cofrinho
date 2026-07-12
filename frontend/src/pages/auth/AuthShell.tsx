import type { ReactNode } from "react";
import { Logo } from "../../components/shared/Logo";
import { LanguageSwitcher } from "../../components/shared/LanguageSwitcher";
import { ThemeToggle } from "../../components/shared/ThemeToggle";
import { PiggyBank, Sparkles, ShieldCheck } from "lucide-react";

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-background lg:grid lg:grid-cols-2">
      {/* Illustration side (desktop) */}
      <div className="relative hidden overflow-hidden bg-primary lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.10),transparent_50%)]" />
        <div className="relative z-10 flex h-full flex-col p-12 text-primary-foreground">
          <div className="flex items-center gap-2 font-semibold">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-white/15 backdrop-blur">
              <PiggyBank className="h-4 w-4" />
            </span>
            <span>Cofrinho</span>
          </div>
          <div className="mt-auto space-y-6">
            <div className="animate-float rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
              <div className="text-xs text-white/70">Balance</div>
              <div className="mt-1 text-3xl font-semibold">$5,240.80</div>
              <div className="mt-4 flex gap-2">
                {[35, 55, 40, 70, 60, 85, 90].map((h, i) => (
                  <div key={i} className="h-16 flex-1 rounded-md bg-white/20" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
            <blockquote className="max-w-md text-lg font-medium leading-relaxed">
              “The purchase simulator turned my anxious shopping decisions into calm, confident ones.”
            </blockquote>
            <div className="flex items-center gap-2 text-sm text-white/80">
              <Sparkles className="h-4 w-4" />
              <span>Loved by 24,000+ mindful spenders</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form side */}
      <div className="flex min-h-dvh flex-col">
        <header className="flex items-center justify-between px-6 py-5 lg:px-10">
          <div className="lg:hidden">
            <Logo />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </header>
        <main className="flex flex-1 items-center justify-center px-6 pb-10">
          <div className="w-full max-w-sm">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>
            <div className="mt-8">{children}</div>
            <div className="mt-8 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-success" /> Secured with end-to-end encryption
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
