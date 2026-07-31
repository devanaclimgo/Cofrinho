import { Link } from "@tanstack/react-router";
import { Bell, Check, ShoppingBag, FileText, Target, Wallet as WalletIcon, TriangleAlert, Sparkles, CalendarClock } from "lucide-react";
import { notifications } from "../../lib/mock-data";
import { useI18n } from "../../i18n/I18nContext";
import { Button } from "../../components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import { ScrollArea } from "../../components/ui/scroll-area";

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

export function NotificationsMenu({ className = "" }: { className?: string }) {
  const { t, locale } = useI18n();
  const unread = notifications.filter((n) => !n.read).length;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={`relative inline-flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground transition hover:bg-muted hover:text-foreground ${className}`}
          aria-label={t("notif.title")}
        >
          <Bell className="h-4 w-4" />
          {unread > 0 && <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />}
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={10} className="w-[22rem] rounded-2xl p-0">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="text-sm font-semibold">{t("notif.title")}</div>
          <button className="inline-flex items-center gap-1 text-xs text-muted-foreground transition hover:text-foreground">
            <Check className="h-3.5 w-3.5" />
            {t("notif.markAll")}
          </button>
        </div>
        <div className="border-t border-border" />
        <ScrollArea className="max-h-80">
          <ul className="divide-y divide-border">
            {notifications.map((n) => {
              const Icon = iconMap[n.category] ?? Bell;
              return (
                <li key={n.id} className={`flex items-start gap-3 px-4 py-3 transition hover:bg-muted/60 ${!n.read ? "bg-primary/5" : ""}`}>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{n.title}</div>
                    <p className="line-clamp-2 text-xs text-muted-foreground">{n.body}</p>
                    <div className="mt-0.5 text-[11px] text-muted-foreground">{n.time}</div>
                  </div>
                  {!n.read && <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />}
                </li>
              );
            })}
          </ul>
        </ScrollArea>
        <div className="border-t border-border p-2">
          <Button asChild variant="ghost" className="h-9 w-full rounded-xl text-sm">
            <Link to="/app/notifications">{locale === "pt" ? "Ver todas" : "View all"}</Link>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
