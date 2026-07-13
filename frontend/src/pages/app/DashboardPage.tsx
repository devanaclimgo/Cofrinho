import { Link } from "@tanstack/react-router";
import { AppLayout } from "../../components/app-layout";
import { useDashboard } from "../../hooks/useDashboard";
import { useI18n } from "../../i18n/I18nContext";
import {
  TrendingUp,
  TrendingDown,
  Wallet as WalletIcon,
  PiggyBank,
  Heart,
  ArrowUpRight,
  ArrowDownRight,
  ArrowLeftRight,
  Calculator,
  Activity,
  CreditCard,
  Banknote,
  Landmark,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Badge } from "../../components/ui/badge";

export default function DashboardPage() {
  const { t, formatCurrency, locale } = useI18n();
  const { data, isLoading, error } = useDashboard();

  // TODO: Add error handling and loading states
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Erro ao carregar dashboard.</div>;
  }

  return (
    <AppLayout title={t("sidebar.dashboard")}>
      <div className="space-y-6">
        {/* Welcome + quick actions */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm text-muted-foreground">
              {locale === "pt" ? "Bom dia, Maria" : "Good morning, Maria"} 👋
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
              {locale === "pt"
                ? "Aqui está seu resumo"
                : "Here's your snapshot"}
            </h2>
          </div>
          <div className="hidden gap-2 sm:flex">
            <QuickAction
              icon={ArrowDownRight}
              label={t("dash.addIncome")}
              tone="success"
            />
            <QuickAction
              icon={ArrowUpRight}
              label={t("dash.addExpense")}
              tone="danger"
            />
            <QuickAction
              icon={ArrowLeftRight}
              label={t("dash.transfer")}
              tone="muted"
            />
            <Link
              to="/app/simulator"
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-95"
            >
              <Calculator className="h-4 w-4" /> {t("dash.simulate")}
            </Link>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label={t("dash.balance")}
            value={formatCurrency(data.summary.balance)}
            delta="+12.4%"
            deltaTone="up"
            icon={WalletIcon}
          />
          <StatCard
            label={t("dash.income")}
            value={formatCurrency(data.summary.income)}
            delta="+3.1%"
            deltaTone="up"
            icon={TrendingUp}
          />
          <StatCard
            label={t("dash.expenses")}
            value={formatCurrency(data.summary.expenses)}
            delta="-1.8%"
            deltaTone="down"
            icon={TrendingDown}
          />
          <StatCard
            label={t("dash.savings")}
            value={formatCurrency(data.summary.savings)}
            delta="+8.2%"
            deltaTone="up"
            icon={PiggyBank}
          />
        </div>

        {/* Forecast + Health */}
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="card-elevated p-6 lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold">{t("dash.forecast")}</h3>
                <p className="text-xs text-muted-foreground">
                  {locale === "pt"
                    ? "Projeção para os próximos 12 meses"
                    : "Projection for the next 12 months"}
                </p>
              </div>
              <div className="flex gap-1 text-xs">
                {(["3M", "6M", "1Y"] as const).map((r, i) => (
                  <button
                    key={r}
                    className={`rounded-lg px-2.5 py-1 transition ${
                      i === 2
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.forecast}>
                  <defs>
                    <linearGradient id="da" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor="var(--primary)"
                        stopOpacity={0.28}
                      />
                      <stop
                        offset="100%"
                        stopColor="var(--primary)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    stroke="var(--border)"
                    strokeDasharray="3 3"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="m"
                    stroke="var(--muted-foreground)"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="var(--muted-foreground)"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
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
                    fill="url(#da)"
                    isAnimationActive
                    animationDuration={1400}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card-elevated p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-semibold">{t("dash.health")}</h3>
                <p className="text-xs text-muted-foreground">
                  {locale === "pt"
                    ? "Baseado em 12 sinais"
                    : "Based on 12 signals"}
                </p>
              </div>
              <Activity className="h-4 w-4 text-primary" />
            </div>
            <ScoreRing value={86} />
            <div className="mt-4 space-y-2">
              {[
                {
                  l:
                    locale === "pt"
                      ? "Reserva de emergência"
                      : "Emergency fund",
                  v: 92,
                },
                {
                  l: locale === "pt" ? "Controle de gastos" : "Spend control",
                  v: 78,
                },
                {
                  l: locale === "pt" ? "Diversificação" : "Diversification",
                  v: 88,
                },
              ].map((r) => (
                <div key={r.l}>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{r.l}</span>
                    <span className="font-medium">{r.v}</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${r.v}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wallets + Recent tx */}
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="card-elevated p-6 lg:col-span-1">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold">{t("dash.wallets")}</h3>
              <Link
                to="/app/wallets"
                className="text-xs text-primary hover:underline"
              >
                {t("common.viewAll")}
              </Link>
            </div>
            <div className="space-y-3">
              {data.wallets.slice(0, 4).map((w) => {
                const Icon =
                  w.type === "credit"
                    ? CreditCard
                    : w.type === "cash"
                      ? Banknote
                      : w.type === "savings"
                        ? PiggyBank
                        : w.type === "investment"
                          ? TrendingUp
                          : Landmark;
                return (
                  <div
                    key={w.id}
                    className="flex items-center gap-3 rounded-xl border border-border p-3 transition hover:bg-muted/40"
                  >
                    <span
                      className="grid h-9 w-9 place-items-center rounded-lg text-white"
                      style={{ backgroundColor: w.color }}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium">
                        {w.name}
                      </div>
                      <div className="truncate text-xs text-muted-foreground">
                        {w.type} {w.last4 ? `• ••${w.last4}` : ""}
                      </div>
                    </div>
                    <div className="text-sm font-semibold">
                      {formatCurrency(w.balance)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card-elevated p-6 lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold">{t("dash.recent")}</h3>
              <Link
                to="/app/transactions"
                className="text-xs text-primary hover:underline"
              >
                {t("common.viewAll")}
              </Link>
            </div>
            <ul className="divide-y divide-border">
              {data.transactions.slice(0, 6).map((tx) => (
                <li key={tx.id} className="flex items-center gap-3 py-3">
                  <span
                    className={`grid h-9 w-9 place-items-center rounded-lg ${
                      tx.type === "income"
                        ? "bg-success/10 text-success"
                        : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    {tx.type === "income" ? (
                      <ArrowDownRight className="h-4 w-4" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4" />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">
                      {tx.title}
                    </div>
                    <div className="truncate text-xs text-muted-foreground">
                      {tx.category} · {tx.wallet}
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-sm font-semibold ${tx.type === "income" ? "text-success" : "text-foreground"}`}
                    >
                      {tx.type === "income" ? "+" : ""}
                      {formatCurrency(Math.abs(tx.amount))}
                    </div>
                    <div className="text-[11px] text-muted-foreground">
                      {new Date(tx.date).toLocaleDateString(
                        locale === "pt" ? "pt-BR" : "en-US",
                        { day: "2-digit", month: "short" },
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Upcoming purchases */}
        <div className="card-elevated p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold">{t("dash.upcoming")}</h3>
            </div>
            <Link
              to="/app/wishlist"
              className="text-xs text-primary hover:underline"
            >
              {t("common.viewAll")}
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {data.wishlist.map((w) => (
              <div
                key={w.id}
                className="rounded-xl border border-border p-4 transition hover:-translate-y-0.5 hover:shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="text-3xl">{w.image}</div>
                  <VerdictBadge verdict={w.verdict} />
                </div>
                <div className="mt-3 text-sm font-medium">{w.name}</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {w.store}
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="font-semibold">
                    {formatCurrency(w.price)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function QuickAction({
  icon: Icon,
  label,
  tone,
}: {
  icon: any;
  label: string;
  tone: "success" | "danger" | "muted";
}) {
  const t: Record<string, string> = {
    success: "text-success",
    danger: "text-destructive",
    muted: "text-foreground",
  };
  return (
    <button className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-card px-3 text-sm font-medium transition hover:bg-muted">
      <Icon className={`h-4 w-4 ${t[tone]}`} /> {label}
    </button>
  );
}

function StatCard({
  label,
  value,
  delta,
  deltaTone,
  icon: Icon,
}: {
  label: string;
  value: string;
  delta: string;
  deltaTone: "up" | "down";
  icon: any;
}) {
  return (
    <div className="card-elevated p-5">
      <div className="flex items-center justify-between">
        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </div>
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <div className="mt-3 text-2xl font-semibold tracking-tight animate-count-up">
        {value}
      </div>
      <div
        className={`mt-1 inline-flex items-center gap-1 text-xs font-medium ${
          deltaTone === "up" ? "text-success" : "text-destructive"
        }`}
      >
        {deltaTone === "up" ? (
          <TrendingUp className="h-3 w-3" />
        ) : (
          <TrendingDown className="h-3 w-3" />
        )}
        {delta}
      </div>
    </div>
  );
}

function ScoreRing({ value }: { value: number }) {
  const r = 42;
  const c = 2 * Math.PI * r;
  const off = c - (value / 100) * c;
  return (
    <div className="mx-auto mt-4 grid h-32 w-32 place-items-center">
      <svg viewBox="0 0 100 100" className="h-32 w-32 -rotate-90">
        <circle
          cx="50"
          cy="50"
          r={r}
          stroke="var(--muted)"
          strokeWidth="8"
          fill="none"
        />
        <circle
          cx="50"
          cy="50"
          r={r}
          stroke="var(--primary)"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={off}
          className="transition-all duration-1000"
        />
      </svg>
      <div className="-mt-32 text-center">
        <div className="text-3xl font-semibold tracking-tight">{value}</div>
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
          / 100
        </div>
      </div>
    </div>
  );
}

function VerdictBadge({ verdict }: { verdict: "buy" | "wait" | "no" }) {
  const map = {
    buy: { c: "bg-success/10 text-success", l: "OK" },
    wait: { c: "bg-warning/10 text-warning-foreground", l: "Wait" },
    no: { c: "bg-destructive/10 text-destructive", l: "Hold" },
  } as const;
  const v = map[verdict];
  return (
    <Badge
      className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${v.c} hover:${v.c}`}
    >
      {v.l}
    </Badge>
  );
}
