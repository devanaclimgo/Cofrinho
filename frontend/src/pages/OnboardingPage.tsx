import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useI18n } from "../i18n/I18nContext";
import { Logo } from "../components/shared/Logo";
import { LanguageSwitcher } from "../components/shared/LanguageSwitcher";
import { ThemeToggle } from "../components/shared/ThemeToggle";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Check,
  Sparkles,
  Wallet,
  CreditCard,
  TrendingUp,
  Target,
} from "lucide-react";
import { CurrencyInput } from "../lib/CurrencyInput";

const steps = [
  { key: "welcome", icon: Sparkles },
  { key: "language", icon: Sparkles },
  { key: "currency", icon: Wallet },
  { key: "wallet", icon: Wallet },
  { key: "balance", icon: Wallet },
  { key: "card", icon: CreditCard },
  { key: "income", icon: TrendingUp },
  { key: "goal", icon: Target },
  { key: "finish", icon: Check },
] as const;

export default function OnboardingPage() {
  const { t, locale, setLocale } = useI18n();
  const [step, setStep] = useState(0);
  const [currency, setCurrency] = useState<"BRL" | "USD" | "EUR">(
    locale === "pt" ? "BRL" : "USD",
  );
  const nav = useNavigate();
  const [balance, setBalance] = useState(0);
  const [cardLimit, setCardLimit] = useState(0);
  const [income, setIncome] = useState(0);
  const [goal, setGoal] = useState(0);

  const progress = ((step + 1) / steps.length) * 100;

  const next = () =>
    step < steps.length - 1 ? setStep(step + 1) : nav("/app/dashboard");
  const back = () => setStep(Math.max(0, step - 1));

  return (
    <div className="min-h-dvh bg-background">
      <header className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
        <Logo />
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <Link
            to="/app/dashboard"
            className="ml-2 text-sm text-muted-foreground hover:text-foreground"
          >
            {t("onb.skip")}
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-xl px-6">
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>
              Step {step + 1} of {steps.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div
          key={step}
          className="animate-fade-in-up rounded-3xl border border-border bg-card p-8 shadow-sm"
        >
          {step === 0 && (
            <StepPane
              emoji="👋"
              title={t("onb.welcome.title")}
              desc={t("onb.welcome.desc")}
            >
              <ul className="mt-6 space-y-3 text-sm">
                {[
                  locale === "pt"
                    ? "Simule qualquer compra antes de fazer"
                    : "Simulate any purchase before you make it",
                  locale === "pt"
                    ? "Preveja seu saldo dos próximos meses"
                    : "Forecast your balance for the next months",
                  locale === "pt"
                    ? "Organize metas e desejos com clareza"
                    : "Organize goals and wishes with clarity",
                ].map((x) => (
                  <li key={x} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{" "}
                    {x}
                  </li>
                ))}
              </ul>
            </StepPane>
          )}
          {step === 1 && (
            <StepPane
              emoji="🌍"
              title={
                locale === "pt" ? "Escolha seu idioma" : "Pick your language"
              }
              desc={
                locale === "pt"
                  ? "Você pode mudar depois"
                  : "You can change it later"
              }
            >
              <div className="mt-6 grid grid-cols-2 gap-3">
                {(["pt", "en"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLocale(l)}
                    className={`rounded-2xl border p-4 text-left transition ${
                      locale === l
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "border-border hover:bg-muted"
                    }`}
                  >
                    <div className="text-2xl">{l === "pt" ? "🇧🇷" : "🇺🇸"}</div>
                    <div className="mt-2 text-sm font-medium">
                      {l === "pt" ? "Português (BR)" : "English (US)"}
                    </div>
                  </button>
                ))}
              </div>
            </StepPane>
          )}
          {step === 2 && (
            <StepPane
              emoji="💱"
              title={
                locale === "pt"
                  ? "Sua moeda principal"
                  : "Your primary currency"
              }
              desc={
                locale === "pt"
                  ? "Usada em toda a plataforma"
                  : "Used across the platform"
              }
            >
              <div className="mt-6 grid grid-cols-3 gap-3">
                {(["BRL", "USD", "EUR"] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`rounded-2xl border p-4 text-center transition ${
                      currency === c
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "border-border hover:bg-muted"
                    }`}
                  >
                    <div className="text-lg font-semibold">{c}</div>
                    <div className="text-xs text-muted-foreground">
                      {c === "BRL"
                        ? "Real"
                        : c === "USD"
                          ? "US Dollar"
                          : "Euro"}
                    </div>
                  </button>
                ))}
              </div>
            </StepPane>
          )}
          {step === 3 && (
            <StepPane
              emoji="👛"
              title={
                locale === "pt"
                  ? "Crie sua primeira carteira"
                  : "Create your first wallet"
              }
              desc={
                locale === "pt"
                  ? "Uma conta ou meio de pagamento"
                  : "An account or payment method"
              }
            >
              <div className="mt-6 space-y-3">
                <Label>{locale === "pt" ? "Nome" : "Name"}</Label>
                <Input
                  defaultValue="Conta principal"
                  className="h-11 rounded-xl"
                />
              </div>
            </StepPane>
          )}
          {step === 4 && (
            <StepPane
              emoji="💰"
              title={locale === "pt" ? "Saldo inicial" : "Initial balance"}
              desc={
                locale === "pt"
                  ? "Quanto você tem hoje?"
                  : "How much do you have today?"
              }
            >
              <div className="mt-6">
                <CurrencyInput
                  currency="BRL"
                  value={balance}
                  onChange={setBalance}
                />
              </div>
            </StepPane>
          )}
          {step === 5 && (
            <StepPane
              emoji="💳"
              title={
                locale === "pt"
                  ? "Adicione um cartão (opcional)"
                  : "Add a card (optional)"
              }
              desc={
                locale === "pt"
                  ? "Para acompanhar seus gastos"
                  : "So we can track your spend"
              }
            >
              <div className="mt-6 space-y-3">
                <div>
                  <Label>{locale === "pt" ? "Apelido" : "Nickname"}</Label>
                  <Input
                    placeholder="Nubank"
                    className="mt-1 h-11 rounded-xl"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>{locale === "pt" ? "Últimos 4" : "Last 4"}</Label>
                    <Input
                      placeholder="4821"
                      maxLength={4}
                      className="mt-1 h-11 rounded-xl"
                    />
                  </div>
                  <div>
                    <Label>{locale === "pt" ? "Limite" : "Limit"}</Label>
                    <CurrencyInput
                      currency="BRL"
                      value={cardLimit}
                      onChange={setCardLimit}
                      className="mt-1 h-11 rounded-xl"
                    />
                  </div>
                </div>
              </div>
            </StepPane>
          )}
          {step === 6 && (
            <StepPane
              emoji="📈"
              title={
                locale === "pt" ? "Sua renda mensal" : "Your monthly income"
              }
              desc={
                locale === "pt"
                  ? "Média das últimas semanas"
                  : "Average of recent weeks"
              }
            >
              <div className="mt-6">
                <CurrencyInput
                  currency="BRL"
                  value={income}
                  onChange={setIncome}
                  className="h-14 rounded-xl text-2xl font-semibold tracking-tight"
                />
              </div>
            </StepPane>
          )}
          {step === 7 && (
            <StepPane
              emoji="🎯"
              title={locale === "pt" ? "Sua primeira meta" : "Your first goal"}
              desc={
                locale === "pt"
                  ? "Vamos ajudar a alcançar!"
                  : "Let's help you get there!"
              }
            >
              <div className="mt-6 space-y-3">
                <div>
                  <Label>
                    {locale === "pt" ? "Nome da meta" : "Goal name"}
                  </Label>
                  <Input
                    placeholder={
                      locale === "pt"
                        ? "Reserva de emergência"
                        : "Emergency fund"
                    }
                    className="mt-1 h-11 rounded-xl"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>{locale === "pt" ? "Valor alvo" : "Target"}</Label>
                    <CurrencyInput
                      currency="BRL"
                      value={goal}
                      onChange={setGoal}
                      className="mt-1 h-11 rounded-xl"
                    />
                  </div>
                  <div>
                    <Label>
                      {locale === "pt" ? "Até quando" : "Target date"}
                    </Label>
                    <Input type="month" className="mt-1 h-11 rounded-xl" />
                  </div>
                </div>
              </div>
            </StepPane>
          )}
          {step === 8 && (
            <StepPane
              emoji="🎉"
              title={locale === "pt" ? "Tudo pronto!" : "All set!"}
              desc={
                locale === "pt"
                  ? "Bem-vindo ao Cofrinho."
                  : "Welcome to Cofrinho."
              }
            >
              <div className="mt-6 rounded-2xl bg-primary/5 p-4 text-sm text-foreground">
                {locale === "pt"
                  ? "Vamos abrir seu painel e mostrar um rápido tour dos recursos."
                  : "We'll open your dashboard and give you a quick tour of the features."}
              </div>
            </StepPane>
          )}

          <div className="mt-8 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={back}
              disabled={step === 0}
              className="rounded-xl"
            >
              {t("onb.back")}
            </Button>
            <Button onClick={next} className="h-11 rounded-xl px-6">
              {step === steps.length - 1 ? t("onb.finish") : t("onb.next")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepPane({
  emoji,
  title,
  desc,
  children,
}: {
  emoji: string;
  title: string;
  desc: string;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-2xl">
        {emoji}
      </div>
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
      {children}
    </div>
  );
}
