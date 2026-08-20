import { useNavigate, Link } from "react-router";
import { useState } from "react";
import { useI18n } from "../../i18n/I18nContext";
import { wallets } from "../../lib/mock-data";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { ArrowDownRight, ArrowLeft, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import {
  createTransaction,
  type TransactionKind,
  type TransactionStatus,
} from "../../api/transactions";

const expenseCats = [
  "Food", "Rent", "Leisure", "Health", "Transport", "Shopping", "Bills", "Other",
];
const incomeCats = ["Salary", "Freelance", "Investments", "Refund", "Gift", "Other"];

const TYPE_CONFIG = {
  income: {
    icon: ArrowUpRight,
    tone: "text-success",
    activeBorder: "border-success bg-success/5",
    label: { pt: "Receita", en: "Income" },
    sub: { pt: "Entrada de dinheiro", en: "Money in" },
  },
  expense: {
    icon: ArrowDownRight,
    tone: "text-destructive",
    activeBorder: "border-destructive bg-destructive/5",
    label: { pt: "Despesa", en: "Expense" },
    sub: { pt: "Saída de dinheiro", en: "Money out" },
  },
} as const;

export default function NewTransactionPage() {
  const { t, locale, formatCurrency } = useI18n();
  const navigate = useNavigate();
  const pt = locale === "pt";

  const [kind, setKind] = useState<TransactionKind>("expense");
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(expenseCats[0]);
  const [walletId, setWalletId] = useState(wallets[0]?.id ?? "");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [status, setStatus] = useState<TransactionStatus>("completed");
  const [saving, setSaving] = useState(false);

  const cats = kind === "income" ? incomeCats : expenseCats;
  const value = Number(amount.replace(",", ".")) || 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await createTransaction({
        amount: value,
        description: title,
        category,
        wallet_id: walletId,
        kind,
        status,
        transaction_date: date,
      });
      const messages = {
        expense: { pt: "Despesa adicionada", en: "Expense added" },
        income: { pt: "Receita adicionada", en: "Income added" },
      };
      toast.success(messages[kind][pt ? "pt" : "en"], {
        description: title || (pt ? "Transação salva" : "Transaction saved"),
      });
      navigate("/app/transactions");
    } catch (error) {
      console.error(error);
      toast.error(pt ? "Não foi possível salvar a transação." : "Could not save the transaction.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="icon" className="h-9 w-9 rounded-xl">
          <Link to="/app/transactions" aria-label={t("common.cancel")}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            {pt ? "Nova transação" : "New transaction"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {pt ? "Registre uma receita ou despesa" : "Record an income or expense"}
          </p>
        </div>
      </div>

      <div className="card-elevated space-y-6 p-6">
        <div className="grid grid-cols-2 gap-3">
          {(Object.keys(TYPE_CONFIG) as TransactionKind[]).map((k) => {
            const cfg = TYPE_CONFIG[k];
            const active = kind === k;
            const Icon = cfg.icon;
            return (
              <button
                type="button"
                key={k}
                onClick={() => {
                  setKind(k);
                  setCategory(k === "income" ? incomeCats[0] : expenseCats[0]);
                }}
                className={`flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition sm:flex-row sm:text-left ${
                  active ? cfg.activeBorder : "border-border hover:bg-muted/60"
                }`}
              >
                <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-muted ${cfg.tone}`}>
                  <Icon className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-sm font-semibold">{cfg.label[pt ? "pt" : "en"]}</span>
                  <span className="hidden text-xs text-muted-foreground sm:block">{cfg.sub[pt ? "pt" : "en"]}</span>
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
            {kind === "income" ? "+" : "−"} {formatCurrency(Math.abs(value))}
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
            <Select value={category} onValueChange={setCategory}>
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
            <Select value={walletId} onValueChange={setWalletId}>
              <SelectTrigger className="h-11 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {wallets.map((w) => (
                  <SelectItem key={w.id} value={w.id}>
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
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-11 rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label>{t("common.status")}</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as TransactionStatus)}>
              <SelectTrigger className="h-11 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="completed">{t("transactions.completed")}</SelectItem>
                <SelectItem value="pending">{t("transactions.pending")}</SelectItem>
                <SelectItem value="scheduled">{pt ? "Agendada" : "Scheduled"}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button asChild variant="outline" className="h-11 rounded-xl sm:w-40">
          <Link to="/app/transactions">{t("common.cancel")}</Link>
        </Button>
        <Button type="submit" disabled={saving} className="h-11 rounded-xl sm:w-48">
          {saving ? (pt ? "Salvando…" : "Saving…") : t("common.save")}
        </Button>
      </div>
    </form>
  );
}