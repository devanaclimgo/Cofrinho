import { useNavigate, Link } from "react-router";
import { useState } from "react";
import { useI18n } from "../../i18n/I18nContext";
import { wallets } from "../../lib/mock-data";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Switch } from "../../components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { ArrowDownLeft, ArrowLeft, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";

const expenseCats = [
  "Food",
  "Rent",
  "Leisure",
  "Health",
  "Transport",
  "Shopping",
  "Bills",
  "Other",
];
const incomeCats = [
  "Salary",
  "Freelance",
  "Investments",
  "Refund",
  "Gift",
  "Other",
];

export default function NewTransactionPage() {
  const { t, locale, formatCurrency } = useI18n();
  const navigate = useNavigate();
  const [type, setType] = useState<"expense" | "income">("expense");
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const pt = locale === "pt";
  const cats = type === "income" ? incomeCats : expenseCats;
  const value = Number(amount.replace(",", ".")) || 0;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        toast.success(
          type === "income"
            ? pt
              ? "Receita adicionada"
              : "Income added"
            : pt
              ? "Despesa adicionada"
              : "Expense added",
          {
            description:
              title || (pt ? "Transação salva" : "Transaction saved"),
          },
        );
        navigate("/app/transactions");
      }}
      className="mx-auto max-w-2xl space-y-6"
    >
      <div className="flex items-center gap-3">
        <Button
          asChild
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-xl"
        >
          <Link to="/app/transactions" aria-label={t("common.cancel")}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            {pt ? "Nova transação" : "New transaction"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {pt
              ? "Registre uma receita ou despesa"
              : "Record an income or an expense"}
          </p>
        </div>
      </div>

      <div className="card-elevated p-6 space-y-6">
        <div className="grid grid-cols-2 gap-3">
          {(["expense", "income"] as const).map((k) => {
            const active = type === k;
            const Icon = k === "income" ? ArrowUpRight : ArrowDownLeft;
            const tone = k === "income" ? "text-success" : "text-destructive";
            return (
              <button
                type="button"
                key={k}
                onClick={() => setType(k)}
                className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition ${
                  active
                    ? "border-primary bg-primary/5"
                    : "border-border hover:bg-muted/60"
                }`}
              >
                <span
                  className={`grid h-10 w-10 place-items-center rounded-xl bg-muted ${tone}`}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-sm font-semibold">
                    {k === "income"
                      ? pt
                        ? "Receita"
                        : "Income"
                      : pt
                        ? "Despesa"
                        : "Expense"}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {k === "income"
                      ? pt
                        ? "Entrada de dinheiro"
                        : "Money in"
                      : pt
                        ? "Saída de dinheiro"
                        : "Money out"}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">{t("common.amount")}</Label>
          <Input
            id="amount"
            inputMode="decimal"
            required
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="h-14 rounded-xl text-2xl font-semibold tracking-tight"
          />
          <p className="text-xs text-muted-foreground">
            {type === "income" ? "+" : "−"} {formatCurrency(Math.abs(value))}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="title">{pt ? "Descrição" : "Description"}</Label>
            <Input
              id="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={pt ? "Ex.: Mercado" : "e.g. Groceries"}
              className="h-11 rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label>{t("common.category")}</Label>
            <Select defaultValue={cats[0]}>
              <SelectTrigger className="h-11 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {cats.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{t("common.wallet")}</Label>
            <Select defaultValue={wallets[0].name}>
              <SelectTrigger className="h-11 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {wallets.map((w) => (
                  <SelectItem key={w.id} value={w.name}>
                    {w.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">{t("common.date")}</Label>
            <Input
              id="date"
              type="date"
              defaultValue="2026-07-31"
              className="h-11 rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label>{t("common.status")}</Label>
            <Select defaultValue="cleared">
              <SelectTrigger className="h-11 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cleared">
                  {pt ? "Concluída" : "Cleared"}
                </SelectItem>
                <SelectItem value="pending">
                  {pt ? "Pendente" : "Pending"}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="notes">{pt ? "Observações" : "Notes"}</Label>
            <Textarea
              id="notes"
              rows={3}
              className="rounded-xl"
              placeholder={pt ? "Opcional" : "Optional"}
            />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-2xl bg-muted/50 p-4">
          <div>
            <div className="text-sm font-medium">
              {pt ? "Transação recorrente" : "Recurring transaction"}
            </div>
            <div className="text-xs text-muted-foreground">
              {pt ? "Repetir todo mês" : "Repeat every month"}
            </div>
          </div>
          <Switch />
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button asChild variant="outline" className="h-11 rounded-xl sm:w-40">
          <Link to="/app/transactions">{t("common.cancel")}</Link>
        </Button>
        <Button type="submit" className="h-11 rounded-xl sm:w-48">
          {t("common.save")}
        </Button>
      </div>
    </form>
  );
}
