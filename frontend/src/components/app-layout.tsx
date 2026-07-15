import { Link, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Wallet,
  Heart,
  Calculator,
  BarChart3,
  Target,
  CalendarDays,
  UserCircle2,
  Bell,
  Settings as SettingsIcon,
  HelpCircle,
  Trash2,
  Plus,
  Search,
  Menu,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { Logo } from "./shared/Logo";
import { LanguageSwitcher } from "./shared/LanguageSwitcher";
import { ThemeToggle } from "./shared/ThemeToggle";
import { useI18n } from "../i18n/I18nContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { useLocation } from "react-router-dom";

const nav = (t: (k: any) => string) =>
  [
    {
      to: "/app/dashboard",
      label: t("sidebar.dashboard"),
      icon: LayoutDashboard,
    },
    {
      to: "/app/transactions",
      label: t("sidebar.transactions"),
      icon: ArrowLeftRight,
    },
    { to: "/app/wallets", label: t("sidebar.wallets"), icon: Wallet },
    { to: "/app/wishlist", label: t("sidebar.wishlist"), icon: Heart },
    { to: "/app/simulator", label: t("sidebar.simulator"), icon: Calculator },
    { to: "/app/analytics", label: t("sidebar.analytics"), icon: BarChart3 },
    { to: "/app/goals", label: t("sidebar.goals"), icon: Target },
    { to: "/app/calendar", label: t("sidebar.calendar"), icon: CalendarDays },
    { to: "/app/profile", label: t("sidebar.profile"), icon: UserCircle2 },
    { to: "/app/notifications", label: t("sidebar.notifications"), icon: Bell },
    { to: "/app/settings", label: t("sidebar.settings"), icon: SettingsIcon },
    { to: "/app/faq", label: t("sidebar.faq"), icon: HelpCircle },
  ] as const;

function SidebarInner({ onNavigate }: { onNavigate?: () => void }) {
  const { t } = useI18n();
  const { pathname } = useLocation();
  const items = nav(t);
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center px-5">
        <Logo />
      </div>
      <div className="px-3 pb-2">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={t("common.search")}
            className="h-9 rounded-xl bg-muted/60 pl-9 text-sm border-transparent focus-visible:bg-card"
          />
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-2">
        <ul className="space-y-0.5">
          {items.map((item) => {
            const active = pathname === item.to;
            const Icon = item.icon;
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={onNavigate}
                  className={`group flex h-10 items-center gap-3 rounded-xl px-3 text-sm transition-colors ${
                    active
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 shrink-0 ${active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}
                    strokeWidth={active ? 2.4 : 2}
                  />
                  <span className="truncate">{item.label}</span>
                  {item.to === "/app/notifications" && (
                    <Badge className="ml-auto h-5 rounded-full bg-primary px-2 text-[10px] font-semibold text-primary-foreground">
                      3
                    </Badge>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="border-t border-border px-3 pb-4 pt-3">
        <div className="mb-3 flex items-center gap-3 rounded-xl px-2 py-2">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
              MA
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium text-foreground">
              Maria Almeida
            </div>
            <div className="truncate text-xs text-muted-foreground">
              maria@example.com
            </div>
          </div>
        </div>
        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10">
          <Trash2 className="h-4 w-4" />
          <span>{useI18n().t("sidebar.delete")}</span>
        </button>
      </div>
    </div>
  );
}

function MobileTopbar({
  children,
  title,
}: {
  children?: ReactNode;
  title: string;
}) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-border bg-background/80 px-4 backdrop-blur-md lg:hidden">
      {children}
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-semibold text-foreground">
          {title}
        </div>
      </div>
      <ThemeToggle />
      <LanguageSwitcher />
    </header>
  );
}

function DesktopTopbar({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-30 hidden h-16 items-center gap-3 border-b border-border bg-background/70 px-6 backdrop-blur-md lg:flex">
      <h1 className="text-lg font-semibold tracking-tight text-foreground">
        {title}
      </h1>
      <div className="relative ml-6 hidden max-w-md flex-1 md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search transactions, goals, wallets…"
          className="h-9 rounded-xl border-transparent bg-muted/60 pl-9 text-sm"
        />
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Link
          to="/app/notifications"
          className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground transition hover:bg-muted hover:text-foreground"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
        </Link>
        <ThemeToggle />
        <LanguageSwitcher />
      </div>
    </header>
  );
}

function BottomNav() {
  const { t } = useI18n();
  const pathname = { select: () => location.pathname };
  const items = [
    {
      to: "/app/dashboard",
      label: t("sidebar.dashboard"),
      icon: LayoutDashboard,
    },
    { to: "/app/wallets", label: t("sidebar.wallets"), icon: Wallet },
    { to: "/app/simulator", label: "Sim", icon: Calculator, primary: true },
    { to: "/app/analytics", label: t("sidebar.analytics"), icon: BarChart3 },
    { to: "/app/goals", label: t("sidebar.goals"), icon: Target },
  ];
  return (
    <>
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden">
        <ul className="mx-auto grid max-w-lg grid-cols-5">
          {items.map((it) => {
            const active = pathname;
            const Icon = it.icon;
            if (it.primary) {
              return (
                <li key={it.to} className="flex justify-center">
                  <Link
                    to={it.to}
                    aria-label={it.label}
                    className="-mt-6 grid h-14 w-14 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-[0_10px_30px_-8px_rgb(37_99_235_/_0.6)] transition hover:opacity-95"
                  >
                    <Plus className="h-6 w-6" strokeWidth={2.5} />
                  </Link>
                </li>
              );
            }
            return (
              <li key={it.to}>
                <Link
                  to={it.to}
                  className={`flex h-16 flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors ${
                    active ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" strokeWidth={active ? 2.4 : 2} />
                  <span className="truncate max-w-[64px]">{it.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

export function AppLayout({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-dvh bg-background">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-border bg-sidebar lg:block">
        <SidebarInner />
      </aside>

      <div className="lg:pl-64">
        <MobileTopbar title={title}>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open menu"
                className="h-9 w-9 rounded-xl"
              >
                {open ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <SidebarInner onNavigate={() => setOpen(false)} />
            </SheetContent>
          </Sheet>
        </MobileTopbar>
        <DesktopTopbar title={title} />
        <main className="mx-auto max-w-7xl px-4 pb-28 pt-6 sm:px-6 lg:px-8 lg:pb-10">
          {children}
        </main>
      </div>

      <BottomNav />
    </div>
  );
}

export function AppRouteOutlet({ title }: { title: string }) {
  return (
    <AppLayout title={title}>
      <Outlet />
    </AppLayout>
  );
}
