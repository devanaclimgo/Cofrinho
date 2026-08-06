import { useNavigate, useSearchParams, Link } from "react-router";
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
import { ArrowDownRight, ArrowLeft, ArrowLeftRight, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";

// TODO: Add data to the backend and fetch it from there instead of using mock data. For now, we are using mock data.

type TxType = "expense" | "income" | "transfer";

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
  transfer: {
    icon: ArrowLeftRight,
    tone: "text-primary",
    activeBorder: "border-primary bg-primary/5",
    label: { pt: "Transferência", en: "Transfer" },
    sub: { pt: "Entre carteiras", en: "Between wallets" },
  },
} as const;

export default function NewTransactionPage() {
  const { t, locale, formatCurrency } = useI18n();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialType = searchParams.get("type");
  const validType: TxType =
    initialType === "income" || initialType === "transfer"
      ? initialType
      : "expense";

  const [type, setType] = useState<TxType>(validType);
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [fromWallet, setFromWallet] = useState(wallets[0]?.name);
  const [toWallet, setToWallet] = useState(wallets[1]?.name ?? wallets[0]?.name);

  const pt = locale === "pt";
  const isTransfer = type === "transfer";
  const cats = type === "income" ? incomeCats : expenseCats;
  const value = Number(amount.replace(",", ".")) || 0;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const messages = {
          income: { pt: "Receita adicionada", en: "Income added" },
          expense: { pt: "Despesa adicionada", en: "Expense added" },
          transfer: { pt: "Transferência realizada", en: "Transfer completed" },
        };
        toast.success(messages[type][pt ? "pt" : "en"], {
          description: title || (pt ? "Transação salva" : "Transaction saved"),
        });
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
              ? "Registre uma receita, despesa ou transferência"
              : "Record an income, expense or transfer"}
          </p>
        </div>
      </div>

      <div className="card-elevated p-6 space-y-6">
        <div className="grid grid-cols-3 gap-3">
          {(Object.keys(TYPE_CONFIG) as TxType[]).map((k) => {
            const cfg = TYPE_CONFIG[k];
            const active = type === k;
            const Icon = cfg.icon;
            return (
              <button
                type="button"
                key={k}
                onClick={() => setType(k)}
                className={`flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition sm:flex-row sm:text-left ${
                  active ? cfg.activeBorder : "border-border hover:bg-muted/60"
                }`}
              >
                <span
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-muted ${cfg.tone}`}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-sm font-semibold">
                    {cfg.label[pt ? "pt" : "en"]}
                  </span>
                  <span className="hidden text-xs text-muted-foreground sm:block">
                    {cfg.sub[pt ? "pt" : "en"]}
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
          {!isTransfer && (
            <p className="text-xs text-muted-foreground">
              {type === "income" ? "+" : "−"} {formatCurrency(Math.abs(value))}
            </p>
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="title">{pt ? "Descrição" : "Description"}</Label>
            <Input
              id="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={
                isTransfer
                  ? pt
                    ? "Ex.: Reserva de emergência"
                    : "e.g. Emergency fund"
                  : pt
                    ? "Ex.: Mercado"
                    : "e.g. Groceries"
              }
              className="h-11 rounded-xl"
            />
          </div>

          {isTransfer ? (
            <>
              <div className="space-y-2">
                <Label>{pt ? "De" : "From"}</Label>
                <Select value={fromWallet} onValueChange={setFromWallet}>
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
                <Label>{pt ? "Para" : "To"}</Label>
                <Select value={toWallet} onValueChange={setToWallet}>
                  <SelectTrigger className="h-11 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {wallets
                      .filter((w) => w.name !== fromWallet)
                      .map((w) => (
                        <SelectItem key={w.id} value={w.name}>
                          {w.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          ) : (
            <>
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
            </>
          )}

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
                  {t("transactions.completed")}
                </SelectItem>
                <SelectItem value="pending">
                  {t("transactions.pending")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="notes">{t("transactions.obs")}</Label>
            <Textarea
              id="notes"
              rows={3}
              className="rounded-xl"
              placeholder={t("transactions.opt")}
            />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-2xl bg-muted/50 p-4">
          <div>
            <div className="text-sm font-medium">
              {isTransfer
                ? t("transactions.transfer.recurring")
                : t("transactions.transaction.recurring")}
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