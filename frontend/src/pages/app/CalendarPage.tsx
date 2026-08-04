import { Link } from "react-router-dom";
import { useI18n } from "../../i18n/I18nContext";
import { calendarEvents } from "../../lib/mock-data";
import { Button } from "../../components/ui/button";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

const weekdays = {
  pt: ["D", "S", "T", "Q", "Q", "S", "S"],
  en: ["S", "M", "T", "W", "T", "F", "S"],
};

// TODO: Add a way to select the year and month to show the data for that period. For now, we are showing the data for the current year and month.
// TODO: Add calendar events to the backend and fetch it from there instead of using mock data.
// TODO: Add a way to add, edit and delete calendar events. For now, we are only showing the events for the current month.
// TODO: Add a way to show the events for the next and previous months. For now, we are only showing the events for the current month.
// TODO: Add a way to show the events for the next and previous years. For now, we are only showing the events for the current year.
// TODO: Add a way for the events to show on the notification center. For now, we are only showing the events on the calendar page.

export default function CalendarPage() {
  const { t, locale } = useI18n();
  const today = 12;
  const daysInMonth = 30;
  const startDay = 1; // Monday-ish
  const cells: (number | null)[] = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const eventsByDay: Record<number, typeof calendarEvents> = {};
  calendarEvents.forEach((e) => {
    (eventsByDay[e.day] ||= []).push(e);
  });

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            {t("cal.title")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {locale === "pt"
              ? "Contas, assinaturas e lembretes"
              : "Bills, subscriptions and reminders"}
          </p>
        </div>
        <Button asChild className="h-10 rounded-xl">
          <Link to="/app/reminder/new">
            <Plus className="mr-2 h-4 w-4" />
            {t("cal.add")}
          </Link>
        </Button>
      </div>

      <div className="card-elevated p-4 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h3 className="text-sm font-semibold">
              {locale === "pt" ? "Julho 2026" : "July 2026"}
            </h3>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 text-[11px] text-muted-foreground">
            <Legend
              color="var(--success)"
              label={locale === "pt" ? "Receita" : "Income"}
            />
            <Legend
              color="var(--destructive)"
              label={locale === "pt" ? "Conta" : "Bill"}
            />
            <Legend
              color="#7C3AED"
              label={locale === "pt" ? "Assinatura" : "Subscription"}
            />
            <Legend
              color="var(--primary)"
              label={locale === "pt" ? "Meta" : "Goal"}
            />
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {weekdays[locale].map((w, i) => (
            <div
              key={i}
              className="pb-2 text-center text-[11px] font-medium uppercase tracking-wider text-muted-foreground"
            >
              {w}
            </div>
          ))}
          {cells.map((d, i) => (
            <div
              key={i}
              className={`min-h-16 rounded-xl border p-2 text-left sm:min-h-24 ${
                d === null
                  ? "border-transparent"
                  : d === today
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:bg-muted/40"
              }`}
            >
              {d && (
                <>
                  <div
                    className={`text-xs font-medium ${d === today ? "text-primary" : "text-foreground"}`}
                  >
                    {d}
                  </div>
                  <div className="mt-1 space-y-1">
                    {(eventsByDay[d] || []).slice(0, 2).map((e, idx) => (
                      <div
                        key={idx}
                        className="truncate rounded-md px-1.5 py-0.5 text-[10px] font-medium"
                        style={{ background: `${e.color}20`, color: e.color }}
                      >
                        {e.title}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="h-2 w-2 rounded-full" style={{ background: color }} />{" "}
      {label}
    </span>
  );
}
