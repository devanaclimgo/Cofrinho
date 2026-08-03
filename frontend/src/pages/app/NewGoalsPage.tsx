import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useI18n } from "../../i18n/I18nContext";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const emojis = ["🛟", "🗾", "🎮", "🚗", "🏠", "🎓", "💍", "🏝️", "💻", "🐶"];
const colors = ["#2563EB", "#7C3AED", "#EC4899", "#059669", "#F59E0B", "#EF4444"];

export default function NewGoalsPage() {
  const { t, locale, formatCurrency } = useI18n();
  const navigate = useNavigate();
  const pt = locale === "pt";
  const [emoji, setEmoji] = useState(emojis[0]);
  const [color, setColor] = useState(colors[0]);
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [monthly, setMonthly] = useState("");

  const targetN = Number(target.replace(",", ".")) || 0;
  const monthlyN = Number(monthly.replace(",", ".")) || 0;
  const months = monthlyN > 0 ? Math.ceil(targetN / monthlyN) : 0;

  // TODO: Add form validation, error handling, and API integration for goal creation
  // TODO: Add a date picker for the target date and handle the selected date in the form submission
  // TODO: Add a priority selection and handle the selected priority in the form submission
  // TODO: Add a current saved amount input and handle the value in the form submission
  // TODO: Add a confirmation modal before submitting the form to ensure the user wants to create the goal  
  // TODO: Add a success notification after the goal is created successfully and handle any errors that may occur during the process
  // TODO: Add a feature to edit existing goals and handle the form submission for updating the goal details
  // TODO: Add a feature to delete existing goals and handle the confirmation and deletion process
  // TODO: Add handle to convert the amounts to the correct currency format

  return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.success(pt ? "Meta criada" : "Goal created", { description: title });
          navigate("/app/goals");
        }}
        className="mx-auto max-w-2xl space-y-6"
      >
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="icon" className="h-9 w-9 rounded-xl">
            <Link to="/app/goals" aria-label={t("common.cancel")}><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">{pt ? "Nova meta" : "New goal"}</h2>
            <p className="text-sm text-muted-foreground">{pt ? "Defina um objetivo e o ritmo de poupança" : "Set a target and your saving pace"}</p>
          </div>
        </div>

        <div className="card-elevated space-y-6 p-6">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-2xl text-3xl" style={{ background: `${color}1a` }}>{emoji}</div>
            <div className="flex flex-wrap gap-2">
              {emojis.map((e) => (
                <button key={e} type="button" onClick={() => setEmoji(e)}
                  className={`h-9 w-9 rounded-xl text-lg transition ${emoji === e ? "bg-primary/10 ring-2 ring-primary" : "hover:bg-muted"}`}>{e}</button>
              ))}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="gtitle">{pt ? "Nome da meta" : "Goal name"}</Label>
              <Input id="gtitle" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder={pt ? "Ex.: Reserva de emergência" : "e.g. Emergency fund"} className="h-11 rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="target">{pt ? "Valor alvo" : "Target amount"}</Label>
              <Input id="target" required inputMode="decimal" value={target} onChange={(e) => setTarget(e.target.value)} placeholder="15000" className="h-11 rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="current">{pt ? "Já poupado" : "Already saved"}</Label>
              <Input id="current" inputMode="decimal" placeholder="0" className="h-11 rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthly">{pt ? "Contribuição mensal" : "Monthly contribution"}</Label>
              <Input id="monthly" inputMode="decimal" value={monthly} onChange={(e) => setMonthly(e.target.value)} placeholder="800" className="h-11 rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deadline">{pt ? "Data alvo" : "Target date"}</Label>
              <Input id="deadline" type="month" defaultValue="2027-01" className="h-11 rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label>{pt ? "Prioridade" : "Priority"}</Label>
              <Select defaultValue="medium">
                <SelectTrigger className="h-11 rounded-xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">{t("common.priority.high")}</SelectItem>
                  <SelectItem value="medium">{t("common.priority.medium")}</SelectItem>
                  <SelectItem value="low">{t("common.priority.low")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{pt ? "Cor" : "Color"}</Label>
              <div className="flex flex-wrap gap-2">
                {colors.map((c) => (
                  <button key={c} type="button" aria-label={c} onClick={() => setColor(c)}
                    className={`h-9 w-9 rounded-xl ring-offset-2 ring-offset-background transition ${color === c ? "ring-2 ring-primary" : ""}`} style={{ background: c }} />
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-muted/50 p-4 text-sm">
            {months > 0 ? (
              <span>
                {pt ? "Poupando" : "Saving"} <strong>{formatCurrency(monthlyN)}</strong>/{pt ? "mês" : "mo"},{" "}
                {pt ? "você alcança" : "you reach"} <strong>{formatCurrency(targetN)}</strong> {pt ? "em" : "in"}{" "}
                <strong>{months} {pt ? "meses" : "months"}</strong>.
              </span>
            ) : (
              <span className="text-muted-foreground">{pt ? "Informe valor alvo e contribuição para ver a projeção." : "Enter a target and contribution to see the projection."}</span>
            )}
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button asChild variant="outline" className="h-11 rounded-xl sm:w-40">
            <Link to="/app/goals">{t("common.cancel")}</Link>
          </Button>
          <Button type="submit" className="h-11 rounded-xl sm:w-48">{t("common.save")}</Button>
        </div>
      </form>
  );
}
