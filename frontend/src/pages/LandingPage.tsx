import { useState } from "react"
import { Link } from "react-router-dom"
import {
  Sparkles,
  Calculator,
  TrendingUp,
  Wallet,
  Heart,
  BarChart3,
  LineChart,
  Check,
  ArrowRight,
  Menu,
  X,
  ShieldCheck,
  Star,
} from "lucide-react"
import { useI18n } from "../i18n/I18nContext"
import { useCurrency } from "../lib/CurrencyContext"
import { Button } from "../components/ui/button"
import { Logo } from "../components/shared/Logo"
import { ThemeToggle } from "../components/shared/ThemeToggle"
import { LanguageSwitcher } from "../components/shared/LanguageSwitcher"
import { testimonials } from "../lib/data"
import { cn } from "../lib/utils"

export function LandingPage() {
  const { t } = useI18n()
  const { fmt } = useCurrency()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [yearly, setYearly] = useState(false)

  const features = [
    { icon: Calculator, title: t("landing.features.simulation.title"), desc: t("landing.features.simulation.desc") },
    { icon: LineChart, title: t("landing.features.forecast.title"), desc: t("landing.features.forecast.desc") },
    { icon: TrendingUp, title: t("landing.features.tracking.title"), desc: t("landing.features.tracking.desc") },
    { icon: Heart, title: t("landing.features.wishlist.title"), desc: t("landing.features.wishlist.desc") },
    { icon: BarChart3, title: t("landing.features.analytics.title"), desc: t("landing.features.analytics.desc") },
    { icon: Wallet, title: t("landing.features.wallets.title"), desc: t("landing.features.wallets.desc") },
  ]

  const plans = [
    {
      name: t("landing.pricing.free.name"),
      desc: t("landing.pricing.free.desc"),
      price: 0,
      features: ["1 carteira", "50 transações/mês", "Simulador básico", "1 meta"],
      cta: t("landing.pricing.cta"),
      popular: false,
    },
    {
      name: t("landing.pricing.pro.name"),
      desc: t("landing.pricing.pro.desc"),
      price: yearly ? 23 : 29,
      features: ["Carteiras ilimitadas", "Transações ilimitadas", "Simulador avançado", "Metas ilimitadas", "Análises detalhadas", "Previsão de fluxo de caixa"],
      cta: t("landing.pricing.ctaPro"),
      popular: true,
    },
    {
      name: t("landing.pricing.business.name"),
      desc: t("landing.pricing.business.desc"),
      price: yearly ? 47 : 59,
      features: ["Tudo do Pro", "Até 5 membros", "Carteiras compartilhadas", "Relatórios em PDF", "Suporte prioritário"],
      cta: t("landing.pricing.cta"),
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Logo />
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">{t("landing.nav.features")}</a>
            <a href="#pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">{t("landing.nav.pricing")}</a>
            <a href="#faq" className="text-sm text-muted-foreground transition-colors hover:text-foreground">{t("landing.nav.faq")}</a>
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            <LanguageSwitcher />
            <ThemeToggle />
            <Link to="/login">
              <Button variant="ghost" size="sm">{t("landing.nav.login")}</Button>
            </Link>
            <Link to="/signup">
              <Button size="sm">{t("landing.nav.signup")}</Button>
            </Link>
          </div>
          <button className="md:hidden" onClick={() => setMobileOpen((v) => !v)} aria-label="Menu">
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {mobileOpen && (
          <div className="border-t border-border/60 bg-background px-4 py-4 md:hidden">
            <div className="flex flex-col gap-3">
              <a href="#features" onClick={() => setMobileOpen(false)} className="py-2 text-sm text-muted-foreground">{t("landing.nav.features")}</a>
              <a href="#pricing" onClick={() => setMobileOpen(false)} className="py-2 text-sm text-muted-foreground">{t("landing.nav.pricing")}</a>
              <a href="#faq" onClick={() => setMobileOpen(false)} className="py-2 text-sm text-muted-foreground">{t("landing.nav.faq")}</a>
              <div className="flex items-center gap-2 pt-2">
                <LanguageSwitcher />
                <ThemeToggle />
              </div>
              <Link to="/login"><Button variant="outline" className="w-full">{t("landing.nav.login")}</Button></Link>
              <Link to="/signup"><Button className="w-full">{t("landing.nav.signup")}</Button></Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-[0.04]" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              {t("landing.hero.badge")}
            </div>
            <h1 className="mt-6 text-balance text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              {t("landing.hero.title")}
            </h1>
            <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
              {t("landing.hero.subtitle")}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  {t("landing.hero.cta")}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/app/dashboard">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  {t("landing.hero.ctaSecondary")}
                </Button>
              </Link>
            </div>
            <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-success" />
              {t("landing.hero.noCard")}
            </p>
          </div>

          {/* Hero mockup */}
          <div className="relative animate-fade-up [animation-delay:120ms]">
            <HeroCard fmt={fmt} t={t} />
          </div>
        </div>
      </section>

      {/* Logos strip */}
      <section className="border-y border-border/60 bg-secondary/30 py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-4 text-sm font-semibold text-muted-foreground/70 sm:px-6">
          <span>+180.000 usuários</span>
          <span className="hidden sm:inline">•</span>
          <span>R$ 2,4 bi planejados</span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-warning text-warning" /> 4,9 na App Store</span>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-primary">{t("landing.features.badge")}</span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">{t("landing.features.title")}</h2>
          <p className="mt-4 text-pretty text-muted-foreground">{t("landing.features.subtitle")}</p>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-y border-border/60 bg-secondary/30 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wide text-primary">{t("landing.testimonials.badge")}</span>
            <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">{t("landing.testimonials.title")}</h2>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((tm) => (
              <div key={tm.name} className="flex flex-col rounded-2xl border border-border bg-card p-6">
                <div className="flex gap-0.5 text-warning">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">{tm.text}</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">{tm.avatar}</div>
                  <div>
                    <p className="text-sm font-medium">{tm.name}</p>
                    <p className="text-xs text-muted-foreground">{tm.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-primary">{t("landing.pricing.badge")}</span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">{t("landing.pricing.title")}</h2>
          <p className="mt-4 text-pretty text-muted-foreground">{t("landing.pricing.subtitle")}</p>
          <div className="mt-8 inline-flex items-center gap-1 rounded-full border border-border bg-secondary/50 p-1">
            <button onClick={() => setYearly(false)} className={cn("rounded-full px-4 py-1.5 text-sm font-medium transition-colors", !yearly ? "bg-card text-foreground shadow-sm" : "text-muted-foreground")}>{t("landing.pricing.monthly")}</button>
            <button onClick={() => setYearly(true)} className={cn("flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors", yearly ? "bg-card text-foreground shadow-sm" : "text-muted-foreground")}>
              {t("landing.pricing.yearly")}
              <span className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-semibold text-success">{t("landing.pricing.save")}</span>
            </button>
          </div>
        </div>
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.name} className={cn("relative flex flex-col rounded-2xl border p-6", plan.popular ? "border-primary bg-card shadow-xl shadow-primary/10" : "border-border bg-card")}>
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">{t("landing.pricing.popular")}</span>
              )}
              <h3 className="font-semibold">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{plan.desc}</p>
              <div className="mt-5 flex items-end gap-1">
                <span className="text-4xl font-bold">{fmt(plan.price)}</span>
                <span className="mb-1 text-sm text-muted-foreground">{t("landing.pricing.month")}</span>
              </div>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    <span className="text-foreground/90">{feat}</span>
                  </li>
                ))}
              </ul>
              <Link to="/signup" className="mt-6">
                <Button className="w-full" variant={plan.popular ? "default" : "outline"}>{plan.cta}</Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <FaqSection />

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-primary px-6 py-16 text-center text-primary-foreground">
          <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-10" />
          <h2 className="relative mx-auto max-w-xl text-balance text-3xl font-bold tracking-tight sm:text-4xl">{t("landing.cta.title")}</h2>
          <p className="relative mx-auto mt-4 max-w-md text-pretty text-primary-foreground/80">{t("landing.cta.subtitle")}</p>
          <Link to="/signup" className="relative mt-8 inline-block">
            <Button size="lg" variant="secondary">{t("landing.hero.cta")}<ArrowRight className="h-4 w-4" /></Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60 py-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <Logo />
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">{t("common.tagline")}</p>
          </div>
          <div className="flex flex-wrap gap-x-10 gap-y-4 text-sm text-muted-foreground">
            <a href="#features" className="transition-colors hover:text-foreground">{t("landing.nav.features")}</a>
            <a href="#pricing" className="transition-colors hover:text-foreground">{t("landing.nav.pricing")}</a>
            <a href="#faq" className="transition-colors hover:text-foreground">{t("landing.nav.faq")}</a>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-6xl border-t border-border/60 px-4 pt-6 text-center text-xs text-muted-foreground sm:px-6">
          © 2026 Cofrinho. {t("landing.footer.rights")}
        </div>
      </footer>
    </div>
  )
}

function HeroCard({ fmt, t }: { fmt: (n: number) => string; t: (k: any) => string }) {
  return (
    <div className="relative mx-auto max-w-sm">
      <div className="absolute -inset-4 -z-10 rounded-3xl bg-primary/10 blur-2xl" />
      <div className="rounded-3xl border border-border bg-card p-5 shadow-2xl">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{t("landing.hero.card.balance")}</span>
          <span className="rounded-full bg-success/15 px-2 py-0.5 text-xs font-medium text-success">+12,4%</span>
        </div>
        <p className="mt-1 text-3xl font-bold">{fmt(46370)}</p>

        <div className="mt-5 rounded-2xl bg-secondary/60 p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{t("landing.hero.card.health")}</span>
            <span className="font-semibold text-success">82/100</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-[82%] rounded-full bg-success" />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-2xl border border-success/30 bg-success/10 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success text-white">
            <Check className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-success">{t("landing.hero.card.canBuy")}</p>
            <p className="text-xs text-muted-foreground">{t("landing.hero.card.simulation")}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const faqKeys = [
  { q: "O Cofrinho é gratuito?", a: "Sim! Você pode começar gratuitamente e fazer upgrade para o plano Pro quando quiser recursos avançados." },
  { q: "Meus dados financeiros estão seguros?", a: "Usamos criptografia de ponta a ponta e nunca compartilhamos seus dados. Sua privacidade é nossa prioridade." },
  { q: "Como funciona o simulador de compras?", a: "Você informa o produto, valor e forma de pagamento, e o Cofrinho analisa seu fluxo de caixa para dizer se é seguro comprar agora." },
  { q: "Posso usar em vários dispositivos?", a: "Sim, o Cofrinho funciona perfeitamente no computador, tablet e celular, com sincronização em tempo real." },
]

function FaqSection() {
  const { t } = useI18n()
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" className="border-t border-border/60 bg-secondary/30 py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-primary">{t("landing.faq.badge")}</span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">{t("landing.faq.title")}</h2>
        </div>
        <div className="mt-10 space-y-3">
          {faqKeys.map((item, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-border bg-card">
              <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 p-5 text-left">
                <span className="font-medium">{item.q}</span>
                <ArrowRight className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", open === i && "rotate-90")} />
              </button>
              {open === i && <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{item.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
