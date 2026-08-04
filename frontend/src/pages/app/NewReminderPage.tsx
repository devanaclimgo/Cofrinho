
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useI18n } from "../../i18n/I18nContext";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Switch } from "../../components/ui/switch";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { ArrowLeft, Bell, CalendarClock, Repeat, Target } from "lucide-react";
import { toast } from "sonner";

export default function NewReminderPage() {
  const { t, locale } = useI18n();
  const navigate = useNavigate();
  const pt = locale === "pt";
  const [kind, setKind] = useState<"bill" | "subscription" | "goal" | "custom">("bill");
  const [title, setTitle] = useState("");

  // TODO: Add data to the backend and fetch it from there instead of using mock data. For now, we are using mock data.

  const kinds = [
    { k: "bill", icon: CalendarClock, label: pt ? "Conta" : "Bill" },
    { k: "subscription", icon: Repeat, label: pt ? "Assinatura" : "Subscription" },
    { k: "goal", icon: Target, label: pt ? "Meta" : "Goal" },
    { k: "custom", icon: Bell, label: pt ? "Personalizado" : "Custom" },
  ] as const;

  return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.success(pt ? "Lembrete criado" : "Reminder created", { description: title });
          navigate("/app/calendar");
        }}
        className="mx-auto max-w-2xl space-y-6"
      >
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="icon" className="h-9 w-9 rounded-xl">
            <Link to="/app/calendar" aria-label={t("common.cancel")}><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">{pt ? "Novo lembrete" : "New reminder"}</h2>
            <p className="text-sm text-muted-foreground">{pt ? "Nunca mais perca um vencimento" : "Never miss a due date again"}</p>
          </div>
        </div>

        <div className="card-elevated space-y-6 p-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {kinds.map((ki) => {
              const Icon = ki.icon;
              const active = kind === ki.k;
              return (
                <button key={ki.k} type="button" onClick={() => setKind(ki.k)}
                  className={`flex items-center gap-2 rounded-2xl border p-3 text-left text-sm transition ${
                    active ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:bg-muted/60"
                  }`}>
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{ki.label}</span>
                </button>
              );
            })}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="rtitle">{pt ? "Título" : "Title"}</Label>
              <Input id="rtitle" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder={pt ? "Ex.: Conta de luz" : "e.g. Electricity bill"} className="h-11 rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ramount">{t("common.amount")}</Label>
              <Input id="ramount" inputMode="decimal" placeholder="124.30" className="h-11 rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rdate">{pt ? "Data de vencimento" : "Due date"}</Label>
              <Input id="rdate" type="date" defaultValue="2026-08-07" className="h-11 rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label>{pt ? "Repetir" : "Repeat"}</Label>
              <Select defaultValue="monthly">
                <SelectTrigger className="h-11 rounded-xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">{pt ? "Não repetir" : "Does not repeat"}</SelectItem>
                  <SelectItem value="weekly">{pt ? "Semanal" : "Weekly"}</SelectItem>
                  <SelectItem value="monthly">{pt ? "Mensal" : "Monthly"}</SelectItem>
                  <SelectItem value="yearly">{pt ? "Anual" : "Yearly"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{pt ? "Avisar" : "Notify me"}</Label>
              <Select defaultValue="3">
                <SelectTrigger className="h-11 rounded-xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">{pt ? "No dia" : "On the day"}</SelectItem>
                  <SelectItem value="1">{pt ? "1 dia antes" : "1 day before"}</SelectItem>
                  <SelectItem value="3">{pt ? "3 dias antes" : "3 days before"}</SelectItem>
                  <SelectItem value="7">{pt ? "1 semana antes" : "1 week before"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="rnotes">{pt ? "Observações" : "Notes"}</Label>
              <Textarea id="rnotes" rows={3} className="rounded-xl" placeholder={pt ? "Opcional" : "Optional"} />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl bg-muted/50 p-4">
            <div>
              <div className="text-sm font-medium">{pt ? "Notificação push" : "Push notification"}</div>
              <div className="text-xs text-muted-foreground">{pt ? "Receber também por e-mail" : "Also send me an email"}</div>
            </div>
            <Switch defaultChecked />
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button asChild variant="outline" className="h-11 rounded-xl sm:w-40">
            <Link to="/app/calendar">{t("common.cancel")}</Link>
          </Button>
          <Button type="submit" className="h-11 rounded-xl sm:w-48">{t("common.save")}</Button>
        </div>
      </form>
  );
}
