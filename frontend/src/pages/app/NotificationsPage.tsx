import { useI18n } from "../../i18n/I18nContext";
import { notifications } from "../../lib/mock-data";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import {
  Bell,
  Check,
  Trash2,
  ShoppingBag,
  FileText,
  Target,
  Wallet as WalletIcon,
  TriangleAlert,
  Sparkles,
  CalendarClock,
} from "lucide-react";

const iconMap: Record<string, any> = {
  purchase: ShoppingBag,
  bill: CalendarClock,
  goal: Target,
  reminder: Bell,
  report: FileText,
  wallet: WalletIcon,
  sim: Sparkles,
  warning: TriangleAlert,
};

export default function NotificationsPage() {
  const { t, locale } = useI18n();
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            {t("notif.title")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {locale === "pt" ? "Novidades e alertas" : "Updates and alerts"}
          </p>
        </div>
        <Button variant="outline" className="h-10 rounded-xl">
          <Check className="mr-2 h-4 w-4" />
          {t("notif.markAll")}
        </Button>
      </div>

      <div className="card-elevated overflow-hidden">
        <ul className="divide-y divide-border">
          {notifications.map((n) => {
            const Icon = iconMap[n.category] ?? Bell;
            return (
              <li
                key={n.id}
                className={`flex items-start gap-4 p-4 sm:p-5 ${!n.read ? "bg-primary/5" : ""}`}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="truncate text-sm font-semibold">
                      {n.title}
                    </div>
                    {!n.read && (
                      <Badge className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground hover:bg-primary">
                        NEW
                      </Badge>
                    )}
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {n.body}
                  </p>
                  <div className="mt-1 text-[11px] text-muted-foreground">
                    {n.time}
                  </div>
                </div>
                <button
                  className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-destructive"
                  aria-label="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
