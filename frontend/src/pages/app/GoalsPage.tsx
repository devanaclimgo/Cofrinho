import { Link } from "react-router-dom";
import { useI18n } from "../../i18n/I18nContext";
import { goals } from "../../lib/mock-data";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Plus } from "lucide-react";

export default function GoalsPage() {
  const { t, formatCurrency, locale } = useI18n();
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            {t("goals.title")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {locale === "pt"
              ? "Suas conquistas planejadas"
              : "Your planned achievements"}
          </p>
        </div>
        <Button asChild className="h-10 rounded-xl">
          <Link to="/app/goals/new">
            <Plus className="mr-2 h-4 w-4" />
            {t("goals.new")}
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {goals.map((g) => {
          const pct = Math.round((g.current / g.target) * 100);
          const r = 40;
          const c = 2 * Math.PI * r;
          const off = c - (pct / 100) * c;
          return (
            <div key={g.id} className="card-elevated p-6">
              <div className="flex items-start gap-4">
                <div className="relative grid h-24 w-24 place-items-center">
                  <svg viewBox="0 0 100 100" className="h-24 w-24 -rotate-90">
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
                      stroke={g.color}
                      strokeWidth="8"
                      strokeLinecap="round"
                      fill="none"
                      strokeDasharray={c}
                      strokeDashoffset={off}
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 grid place-items-center text-xl">
                    {g.emoji}
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-base font-semibold">{g.title}</div>
                    <Badge className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary hover:bg-primary/10">
                      {t(`common.priority.${g.priority}` as any)}
                    </Badge>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {locale === "pt" ? "Até" : "By"} {g.targetDate}
                  </div>
                  <div className="mt-3 text-sm">
                    <span className="font-semibold">
                      {formatCurrency(g.current)}
                    </span>{" "}
                    <span className="text-muted-foreground">
                      / {formatCurrency(g.target)}
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    {locale === "pt"
                      ? "Contribuição mensal"
                      : "Monthly contribution"}
                    : {formatCurrency(g.monthly)}
                  </div>
                </div>
              </div>
              <div className="mt-5 flex items-center gap-2 text-xs">
                <div className="rounded-lg bg-success/10 px-2 py-1 text-success">
                  {pct}% {locale === "pt" ? "concluído" : "complete"}
                </div>
                <div className="text-muted-foreground">
                  {locale === "pt" ? "Estimado" : "Estimated"}: {g.targetDate}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
