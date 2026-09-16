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
import { useQueryClient } from "@tanstack/react-query";
import { completeOnboarding } from "../api/onboarding";
import { useAuth } from "../hooks/useAuth";

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
  const [walletName, setWalletName] = useState("Conta principal");
  const [cardNickname, setCardNickname] = useState("");
  const [cardLast4, setCardLast4] = useState("");
  const [goalName, setGoalName] = useState("");
  const [goalDate, setGoalDate] = useState("");
  const { refreshUser } = useAuth();
  const queryClient = useQueryClient();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const progress = ((step + 1) / steps.length) * 100;

  const next = async () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    try {
      await completeOnboarding({
        user: { currency, locale, monthly_income: income },
        wallet: { name: walletName, balance },
        card: cardNickname
          ? { nickname: cardNickname, last4: cardLast4, limit: cardLimit }
          : undefined,
        goal: goalName
          ? { name: goalName, target_amount: goal, target_date: goalDate }
          : undefined,
      });
      await refreshUser();
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      nav("/app/dashboard");
    } catch (err: any) {
      setSubmitError(err.response?.data?.error ?? "Erro ao salvar");
    } finally {
      setSubmitting(false);
    }
  };
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
                  t("onboarding.welcome.list1"),
                  t("onboarding.welcome.list2"),
                  t("onboarding.welcome.list3"),
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
              title={t("onboarding.step1.title")}
              desc={t("onboarding.step1.subtitle")}
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
                    <div className="text-2xl">{t("onboarding.flag")}</div>
                    <div className="mt-2 text-sm font-medium">
                      {t("onboarding.flag.subtitle")}
                    </div>
                  </button>
                ))}
              </div>
            </StepPane>
          )}
          {step === 2 && (
            <StepPane
              emoji="💱"
              title={t("onboarding.step2.title")}
              desc={t("onboarding.step2.subtitle")}
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
              title={t("onboarding.step3.title")}
              desc={t("onboarding.step3.subtitle")}
            >
              <div className="mt-6 space-y-3">
                <Label>{t("onboarding.step3.name")}</Label>
                <Input
                  defaultValue="Conta principal"
                  className="h-11 rounded-xl"
                  value={walletName}
                  onChange={(e) => setWalletName(e.target.value)}
                />
              </div>
            </StepPane>
          )}
          {step === 4 && (
            <StepPane
              emoji="💰"
              title={t("onboarding.step4.title")}
              desc={t("onboarding.step4.subtitle")}
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
              title={t("onboarding.step5.title")}
              desc={t("onboarding.step5.subtitle")}
            >
              <div className="mt-6 space-y-3">
                <div>
                  <Label>{t("onboarding.step5.nickname")}</Label>
                  <Input
                    placeholder="Nubank"
                    className="mt-1 h-11 rounded-xl"
                    value={cardNickname}
                    onChange={(e) => setCardNickname(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>{t("onboarding.step5.number")}</Label>
                    <Input
                      placeholder="4821"
                      maxLength={4}
                      className="mt-1 h-11 rounded-xl"
                      value={cardLast4}
                      onChange={(e) => setCardLast4(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>{t("onboarding.step5.limit")}</Label>
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
              title={t("onboarding.step6.title")}
              desc={t("onboarding.step6.subtitle")}
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
              title={t("onboarding.step7.title")}
              desc={t("onboarding.step7.subtitle")}
            >
              <div className="mt-6 space-y-3">
                <div>
                  <Label>{t("onboarding.step7.name")}</Label>
                  <Input
                    placeholder={t("onboarding.step7.fund")}
                    className="mt-1 h-11 rounded-xl"
                    value={goalName}
                    onChange={(e) => setGoalName(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>{t("onboarding.step7.target")}</Label>
                    <CurrencyInput
                      currency="BRL"
                      value={goal}
                      onChange={setGoal}
                      className="mt-1 h-11 rounded-xl"
                    />
                  </div>
                  <div>
                    <Label>{t("onboarding.step7.targetDate")}</Label>
                    <Input
                      type="month"
                      className="mt-1 h-11 rounded-xl"
                      value={goalDate}
                      onChange={(e) => setGoalDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </StepPane>
          )}
          {step === 8 && (
            <StepPane
              emoji="🎉"
              title={t("onboarding.step8.title")}
              desc={t("onboarding.step8.subtitle")}
            >
              <div className="mt-6 rounded-2xl bg-primary/5 p-4 text-sm text-foreground">
                {t("onboarding.step8.open")}
              </div>
            </StepPane>
          )}

          <div className="mt-8 space-y-3">
            {submitError && (
              <p className="text-sm text-destructive">{submitError}</p>
            )}
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={back}
                disabled={step === 0 || submitting}
                className="rounded-xl"
              >
                {t("onb.back")}
              </Button>
              <Button
                onClick={next}
                disabled={submitting}
                className="h-11 rounded-xl px-6"
              >
                {submitting
                  ? t("onboarding.save")
                  : step === steps.length - 1
                    ? t("onb.finish")
                    : t("onb.next")}
              </Button>
            </div>
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
