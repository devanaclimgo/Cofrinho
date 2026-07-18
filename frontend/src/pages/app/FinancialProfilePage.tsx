import { AppLayout } from "../../components/app-layout";
import { useI18n } from "../../i18n/I18nContext";
import { forecastData, categoryData } from "../../lib/mock-data";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { TrendingUp, PiggyBank, Wallet as WalletIcon, Activity, Sparkles } from "lucide-react";

export default function FinancialProfilePage() {
  const { t, locale, formatCurrency } = useI18n();
  return (
    <AppLayout title={t("sidebar.profile")}>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">{t("sidebar.profile")}</h2>
          <p className="text-sm text-muted-foreground">
            {locale === "pt" ? "Uma visão profunda da sua vida financeira" : "A deep view of your financial life"}
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="card-elevated p-6 lg:col-span-1">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">{t("dash.health")}</div>
            <div className="mt-2 flex items-baseline gap-2">
              <div className="text-5xl font-semibold tracking-tight">86</div>
              <div className="text-sm text-success">+4</div>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{locale === "pt" ? "Excelente" : "Excellent"}</p>
            <div className="mt-4 h-24">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={forecastData}>
                  <defs>
                    <linearGradient id="pf" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area dataKey="balance" stroke="hsl(var(--primary))" fill="url(#pf)" strokeWidth={2} isAnimationActive />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card-elevated p-6 lg:col-span-2">
            <h3 className="text-sm font-semibold">{locale === "pt" ? "Insights pessoais" : "Personal insights"}</h3>
            <ul className="mt-4 space-y-3">
              {[
                locale === "pt"
                  ? "Sua taxa de poupança melhorou 18% este trimestre."
                  : "Your savings rate improved 18% this quarter.",
                locale === "pt"
                  ? "Você gasta menos que a média com lazer."
                  : "You spend less than average on entertainment.",
                locale === "pt"
                  ? "Sua reserva de emergência está crescendo consistentemente."
                  : "Your emergency fund is growing steadily.",
              ].map((x) => (
                <li key={x} className="flex items-start gap-3 rounded-xl bg-primary/5 p-3">
                  <Sparkles className="mt-0.5 h-4 w-4 text-primary" />
                  <span className="text-sm">{x}</span>
                </li>
              ))}
            </ul>
          </div>

          <StatCard icon={PiggyBank} label={locale === "pt" ? "Taxa de poupança" : "Savings rate"} value="24.8%" sub="+8.2%" />
          <StatCard icon={TrendingUp} label={locale === "pt" ? "Receita média" : "Avg income"} value={formatCurrency(5750)} sub="+3.1%" />
          <StatCard icon={Activity} label={locale === "pt" ? "Despesa média" : "Avg expenses"} value={formatCurrency(4360)} sub="-1.8%" />
          <StatCard icon={WalletIcon} label={locale === "pt" ? "Patrimônio líquido" : "Net worth"} value={formatCurrency(28800)} sub="+12.4%" />

          <div className="card-elevated p-6 lg:col-span-2">
            <h3 className="text-sm font-semibold">{locale === "pt" ? "Distribuição por carteira" : "Wallet distribution"}</h3>
            <div className="mt-4 space-y-3">
              {categoryData.map((c) => {
                const pct = Math.round((c.value / categoryData.reduce((a, b) => a + b.value, 0)) * 100);
                return (
                  <div key={c.name}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium">{c.name}</span>
                      <span className="text-muted-foreground">{pct}%</span>
                    </div>
                    <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full transition-all duration-700" style={{ background: c.color, width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function StatCard({ icon: Icon, label, value, sub }: { icon: any; label: string; value: string; sub: string }) {
  return (
    <div className="card-elevated p-5">
      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <div className="mt-3 text-2xl font-semibold tracking-tight">{value}</div>
      <div className="mt-1 text-xs text-success">{sub}</div>
    </div>
  );
}
