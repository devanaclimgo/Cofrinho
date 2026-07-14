import { Link } from "@tanstack/react-router";
import { useI18n } from "../i18n/I18nContext";
import { Logo } from "../components/shared/Logo";
import { LanguageSwitcher } from "../components/shared/LanguageSwitcher";
import { ThemeToggle } from "../components/shared/ThemeToggle";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Wallet,
  Calculator,
  BarChart3,
  Heart,
  LineChart as LineChartIcon,
  Layers,
  Play,
  Check,
} from "lucide-react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  Line,
  LineChart,
} from "recharts";
import { forecastData, faqs } from "../lib/mock-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

export default function Landing() {
  const { t, locale } = useI18n();

  return (
    <div className="min-h-dvh bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <Logo />
          <nav className="ml-10 hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm text-muted-foreground transition hover:text-foreground">{t("nav.features")}</a>
            <a href="#pricing" className="text-sm text-muted-foreground transition hover:text-foreground">{t("nav.pricing")}</a>
            <a href="#faq" className="text-sm text-muted-foreground transition hover:text-foreground">{t("nav.faq")}</a>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <Link
              to="/login"
              className="hidden h-9 items-center rounded-xl px-3 text-sm font-medium text-foreground transition hover:bg-muted sm:inline-flex"
            >
              {t("nav.login")}
            </Link>
            <Link
              to="/signup"
              className="inline-flex h-9 items-center rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-95"
            >
              {t("nav.signup")}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-10%] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute right-[-10%] top-40 h-[300px] w-[300px] rounded-full bg-primary/5 blur-2xl" />
        </div>

        <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-16 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:pt-24">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>{t("hero.badge")}</span>
            </div>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              <span className="gradient-hero-text">{t("hero.title")}</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("hero.subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/signup"
                className="inline-flex h-12 items-center gap-2 rounded-2xl bg-primary px-6 text-sm font-medium text-primary-foreground shadow-[var(--shadow-float)] transition hover:opacity-95"
              >
                {t("hero.cta")} <ArrowRight className="h-4 w-4" />
              </Link>
              <button className="inline-flex h-12 items-center gap-2 rounded-2xl border border-border bg-card px-5 text-sm font-medium text-foreground transition hover:bg-muted">
                <Play className="h-4 w-4" /> {t("hero.cta2")}
              </button>
            </div>
            <div className="mt-8 flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex -space-x-2">
                {["A", "M", "K", "R"].map((c, i) => (
                  <div
                    key={c}
                    className="grid h-7 w-7 place-items-center rounded-full border-2 border-background bg-primary/10 text-[10px] font-semibold text-primary"
                    style={{ zIndex: 10 - i }}
                  >
                    {c}
                  </div>
                ))}
              </div>
              <span>{t("hero.trust")}</span>
            </div>
          </div>

          {/* Floating hero visual */}
          <div className="relative h-[440px] lg:h-[520px]">
            <HeroVisual locale={locale} />
          </div>
        </div>

        {/* logo row */}
        <div className="mx-auto grid max-w-6xl grid-cols-2 items-center gap-6 border-y border-border/60 px-6 py-6 opacity-80 sm:grid-cols-3 lg:grid-cols-6">
          {["Notion", "Linear", "Stripe", "Vercel", "Arc", "Raycast"].map((l) => (
            <div key={l} className="text-center text-sm font-medium tracking-tight text-muted-foreground">
              {l}
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-medium">Features</Badge>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{t("features.title")}</h2>
          <p className="mt-3 text-muted-foreground">{t("features.subtitle")}</p>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard icon={Calculator} title={t("feat.sim.title")} desc={t("feat.sim.desc")} accent />
          <FeatureCard icon={LineChartIcon} title={t("feat.forecast.title")} desc={t("feat.forecast.desc")} />
          <FeatureCard icon={BarChart3} title={t("feat.tracking.title")} desc={t("feat.tracking.desc")} />
          <FeatureCard icon={Heart} title={t("feat.wishlist.title")} desc={t("feat.wishlist.desc")} />
          <FeatureCard icon={Layers} title={t("feat.analytics.title")} desc={t("feat.analytics.desc")} />
          <FeatureCard icon={Wallet} title={t("feat.wallets.title")} desc={t("feat.wallets.desc")} />
        </div>
      </section>

      {/* Product screenshot */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-border bg-card p-2 shadow-[var(--shadow-elevated)]">
          <ProductPreview />
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              q: locale === "pt" ? "Nunca mais comprei por impulso." : "I never buy on impulse again.",
              n: "Rafael M.",
              r: locale === "pt" ? "Designer" : "Designer",
            },
            {
              q: locale === "pt" ? "O simulador salvou minha viagem." : "The simulator saved my trip.",
              n: "Ana P.",
              r: locale === "pt" ? "Engenheira" : "Engineer",
            },
            {
              q: locale === "pt" ? "Finalmente entendo pra onde vai meu dinheiro." : "I finally understand where my money goes.",
              n: "Kaio S.",
              r: locale === "pt" ? "Estudante" : "Student",
            },
          ].map((tst) => (
            <figure key={tst.n} className="card-elevated p-6">
              <blockquote className="text-base leading-relaxed text-foreground">“{tst.q}”</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  {tst.n[0]}
                </div>
                <div>
                  <div className="text-sm font-medium">{tst.n}</div>
                  <div className="text-xs text-muted-foreground">{tst.r}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t("pricing.title")}</h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <PricingCard name={t("pricing.free")} price={0} features={[
            locale === "pt" ? "1 carteira" : "1 wallet",
            locale === "pt" ? "Transações ilimitadas" : "Unlimited transactions",
            locale === "pt" ? "Simulador básico" : "Basic simulator",
          ]} />
          <PricingCard highlight name={t("pricing.pro")} price={locale === "pt" ? 19 : 6} features={[
            locale === "pt" ? "Carteiras ilimitadas" : "Unlimited wallets",
            locale === "pt" ? "Simulador avançado com IA" : "Advanced AI simulator",
            locale === "pt" ? "Metas ilimitadas" : "Unlimited goals",
            "Analytics",
          ]} />
          <PricingCard name={t("pricing.team")} price={locale === "pt" ? 39 : 12} features={[
            locale === "pt" ? "Até 5 pessoas" : "Up to 5 people",
            locale === "pt" ? "Carteiras compartilhadas" : "Shared wallets",
            locale === "pt" ? "Relatórios familiares" : "Family reports",
          ]} />
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-4 pb-24 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-semibold tracking-tight sm:text-4xl">{t("faq.title")}</h2>
        <Accordion type="single" collapsible className="mt-10">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`i${i}`} className="border-border">
              <AccordionTrigger className="text-left text-base font-medium">
                {f.q[locale]}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {f.a[locale]}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 text-center shadow-sm sm:p-16">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-transparent" />
          <h3 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t("hero.title")}</h3>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">{t("hero.subtitle")}</p>
          <div className="mt-8">
            <Link
              to="/signup"
              className="inline-flex h-12 items-center gap-2 rounded-2xl bg-primary px-6 text-sm font-medium text-primary-foreground shadow-[var(--shadow-float)] transition hover:opacity-95"
            >
              {t("hero.cta")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div>
            <Logo />
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">{t("footer.tagline")}</p>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground">{t("nav.features")}</a>
            <a href="#pricing" className="hover:text-foreground">{t("nav.pricing")}</a>
            <a href="#faq" className="hover:text-foreground">{t("nav.faq")}</a>
            <div className="flex items-center gap-1 text-xs">
              <ShieldCheck className="h-3.5 w-3.5 text-success" />
              <span>SOC 2</span>
            </div>
          </div>
        </div>
        <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
          © 2026 Cofrinho. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  desc,
  accent,
}: {
  icon: any;
  title: string;
  desc: string;
  accent?: boolean;
}) {
  return (
    <div className="group relative rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)]">
      <div
        className={`grid h-11 w-11 place-items-center rounded-xl ${
          accent ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
        }`}
      >
        <Icon className="h-5 w-5" strokeWidth={2.2} />
      </div>
      <h3 className="mt-5 text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
    </div>
  );
}

function PricingCard({
  name,
  price,
  features,
  highlight,
}: {
  name: string;
  price: number;
  features: string[];
  highlight?: boolean;
}) {
  const { t, locale } = useI18n();
  return (
    <div
      className={`relative rounded-2xl border p-8 shadow-sm ${
        highlight ? "border-primary bg-card ring-2 ring-primary/20" : "border-border bg-card"
      }`}
    >
      {highlight && (
        <Badge className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-[10px] font-semibold text-primary-foreground">
          {locale === "pt" ? "MAIS POPULAR" : "MOST POPULAR"}
        </Badge>
      )}
      <div className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{name}</div>
      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-4xl font-semibold tracking-tight">
          {locale === "pt" ? "R$" : "$"}{price}
        </span>
        <span className="text-sm text-muted-foreground">{t("pricing.month")}</span>
      </div>
      <ul className="mt-6 space-y-3 text-sm">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <Button
        asChild
        className={`mt-8 h-11 w-full rounded-xl ${highlight ? "" : "bg-foreground text-background hover:bg-foreground/90"}`}
      >
        <Link to="/signup">{t("pricing.cta")}</Link>
      </Button>
    </div>
  );
}

function HeroVisual({ locale }: { locale: "pt" | "en" }) {
  return (
    <div className="relative h-full w-full">
      {/* Main balance card */}
      <div className="animate-fade-in-up absolute right-0 top-0 w-[320px] rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-elevated)] sm:w-[360px]">
        <div className="flex items-center justify-between">
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {locale === "pt" ? "Saldo total" : "Total balance"}
          </div>
          <Badge className="rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-medium text-success hover:bg-success/10">+12.4%</Badge>
        </div>
        <div className="mt-2 text-3xl font-semibold tracking-tight">
          {locale === "pt" ? "R$ 27.980,00" : "$5,240.80"}
        </div>
        <div className="mt-4 h-24">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={forecastData}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="balance"
                stroke="var(--primary)"
                strokeWidth={2.5}
                fill="url(#g1)"
                isAnimationActive
                animationDuration={1600}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Simulator card */}
      <div
        className="animate-float absolute left-0 top-32 w-[280px] rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-elevated)] sm:w-[300px]"
        style={{ animationDelay: "0.15s" }}
      >
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
            <Calculator className="h-4 w-4" />
          </span>
          <div>
            <div className="text-xs text-muted-foreground">{locale === "pt" ? "Simulação" : "Simulation"}</div>
            <div className="text-sm font-medium">Sony WH-1000XM6</div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          {[
            { m: "Jul", s: "ok" },
            { m: "Aug", s: "warn" },
            { m: "Sep", s: "bad" },
          ].map((x) => (
            <div key={x.m} className="rounded-lg border border-border p-2">
              <div className="text-[10px] uppercase text-muted-foreground">{x.m}</div>
              <div
                className={`mx-auto mt-1 h-2 w-2 rounded-full ${
                  x.s === "ok" ? "bg-success" : x.s === "warn" ? "bg-warning" : "bg-destructive"
                }`}
              />
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-lg bg-warning/10 p-2 text-[11px] leading-relaxed text-warning-foreground">
          {locale === "pt" ? "Considere comprar em outubro." : "Consider buying in October."}
        </div>
      </div>

      {/* Goal card */}
      <div
        className="animate-fade-in-up animate-float-delay absolute bottom-8 right-6 w-[240px] rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-elevated)]"
        style={{ animationDelay: "0.3s" }}
      >
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">{locale === "pt" ? "Meta" : "Goal"}</div>
          <div className="text-lg">🗾</div>
        </div>
        <div className="mt-1 text-sm font-medium">{locale === "pt" ? "Viagem para o Japão" : "Trip to Japan"}</div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary transition-all duration-1000" style={{ width: "62%" }} />
        </div>
        <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
          <span>62%</span>
          <span>{locale === "pt" ? "R$ 7.400 / R$ 12.000" : "$1,650 / $2,600"}</span>
        </div>
      </div>

      {/* Line trend micro-card */}
      <div className="animate-fade-in-up absolute bottom-0 left-4 hidden w-[220px] rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-elevated)] sm:block" style={{ animationDelay: "0.45s" }}>
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">{locale === "pt" ? "Poupança" : "Savings rate"}</div>
          <div className="text-xs font-medium text-success">+8.2%</div>
        </div>
        <div className="mt-2 h-14">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={forecastData.slice(4)}>
              <Line
                type="monotone"
                dataKey="income"
                stroke="var(--success)"
                strokeWidth={2}
                dot={false}
                isAnimationActive
                animationDuration={1400}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function ProductPreview() {
  const { locale } = useI18n();
  return (
    <div className="overflow-hidden rounded-2xl bg-background">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
        </div>
        <div className="mx-auto rounded-md bg-muted px-3 py-0.5 text-xs text-muted-foreground">
          app.cofrinho.com/dashboard
        </div>
      </div>
      <div className="grid gap-4 p-4 sm:p-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">{locale === "pt" ? "Saldo" : "Balance"}</div>
          <div className="mt-2 text-2xl font-semibold">{locale === "pt" ? "R$ 27.980" : "$5,240"}</div>
          <div className="mt-1 text-xs text-success">+12.4%</div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">{locale === "pt" ? "Poupança" : "Savings"}</div>
          <div className="mt-2 text-2xl font-semibold">{locale === "pt" ? "R$ 8.400" : "$1,640"}</div>
          <div className="mt-1 text-xs text-success">+8.2%</div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">{locale === "pt" ? "Saúde" : "Health"}</div>
          <div className="mt-2 text-2xl font-semibold">86</div>
          <div className="mt-1 text-xs text-muted-foreground">{locale === "pt" ? "Excelente" : "Excellent"}</div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 lg:col-span-3">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-medium">{locale === "pt" ? "Previsão dos próximos meses" : "Forecast of upcoming months"}</div>
            <div className="text-xs text-muted-foreground">12 {locale === "pt" ? "meses" : "months"}</div>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecastData}>
                <defs>
                  <linearGradient id="gp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="balance"
                  stroke="var(--primary)"
                  strokeWidth={2.5}
                  fill="url(#gp)"
                  isAnimationActive
                  animationDuration={1600}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
