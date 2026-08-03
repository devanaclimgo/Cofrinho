import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useI18n } from "../../i18n/I18nContext";
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
import {
  ArrowLeft,
  CreditCard,
  Landmark,
  Banknote,
  PiggyBank,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";

const colors = [
  "#2563EB",
  "#7C3AED",
  "#EC4899",
  "#059669",
  "#F59E0B",
  "#EF4444",
  "#0EA5E9",
  "#111827",
];

export default function NewWalletPage() {
  const { t, locale } = useI18n();
  const navigate = useNavigate();
  const pt = locale === "pt";
  const [type, setType] = useState<
    "credit" | "debit" | "cash" | "savings" | "investment"
  >("credit");
  const [color, setColor] = useState(colors[0]);
  const [name, setName] = useState("");

  const types = [
    {
      k: "credit",
      icon: CreditCard,
      label: pt ? "Cartão de crédito" : "Credit card",
    },
    { k: "debit", icon: Landmark, label: pt ? "Conta corrente" : "Checking" },
    { k: "cash", icon: Banknote, label: pt ? "Dinheiro" : "Cash" },
    { k: "savings", icon: PiggyBank, label: pt ? "Poupança" : "Savings" },
    {
      k: "investment",
      icon: TrendingUp,
      label: pt ? "Investimentos" : "Investments",
    },
  ] as const;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        toast.success(pt ? "Carteira criada" : "Wallet created", {
          description: name,
        });
        navigate("/app/wallets");
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
          <Link to="/app/wallets" aria-label={t("common.cancel")}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            {pt ? "Nova carteira" : "New wallet"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {pt
              ? "Cartões, contas e investimentos"
              : "Cards, accounts and investments"}
          </p>
        </div>
      </div>

      <div
        className="card-elevated relative overflow-hidden p-6 text-white"
        style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}
      >
        <div className="text-xs uppercase tracking-widest opacity-80">
          {types.find((x) => x.k === type)?.label}
        </div>
        <div className="mt-6 text-xl font-semibold">
          {name || (pt ? "Nome da carteira" : "Wallet name")}
        </div>
        <div className="mt-1 text-sm opacity-80">•••• 0000</div>
      </div>

      <div className="card-elevated space-y-6 p-6">
        <div className="space-y-2">
          <Label>{pt ? "Tipo" : "Type"}</Label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {types.map((ty) => {
              const Icon = ty.icon;
              const active = type === ty.k;
              return (
                <button
                  key={ty.k}
                  type="button"
                  onClick={() => setType(ty.k)}
                  className={`flex items-center gap-2 rounded-2xl border p-3 text-left text-sm transition ${
                    active
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border text-muted-foreground hover:bg-muted/60"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{ty.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="wname">{pt ? "Nome" : "Name"}</Label>
            <Input
              id="wname"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={pt ? "Ex.: Nubank" : "e.g. Chase"}
              className="h-11 rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="balance">
              {pt ? "Saldo atual" : "Current balance"}
            </Label>
            <Input
              id="balance"
              inputMode="decimal"
              placeholder="0.00"
              className="h-11 rounded-xl"
            />
          </div>
          {type === "credit" && (
            <div className="space-y-2">
              <Label htmlFor="limit">{pt ? "Limite" : "Credit limit"}</Label>
              <Input
                id="limit"
                inputMode="decimal"
                placeholder="5000"
                className="h-11 rounded-xl"
              />
            </div>
          )}
          {(type === "credit" || type === "debit") && (
            <div className="space-y-2">
              <Label htmlFor="last4">
                {pt ? "Últimos 4 dígitos" : "Last 4 digits"}
              </Label>
              <Input
                id="last4"
                inputMode="numeric"
                maxLength={4}
                placeholder="1234"
                className="h-11 rounded-xl"
              />
            </div>
          )}
          <div className="space-y-2">
            <Label>{pt ? "Moeda" : "Currency"}</Label>
            <Select defaultValue={pt ? "BRL" : "USD"}>
              <SelectTrigger className="h-11 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BRL">BRL — R$</SelectItem>
                <SelectItem value="USD">USD — $</SelectItem>
                <SelectItem value="EUR">EUR — €</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>{pt ? "Cor" : "Color"}</Label>
          <div className="flex flex-wrap gap-2">
            {colors.map((c) => (
              <button
                key={c}
                type="button"
                aria-label={c}
                onClick={() => setColor(c)}
                className={`h-9 w-9 rounded-xl ring-offset-2 ring-offset-background transition ${color === c ? "ring-2 ring-primary" : ""}`}
                style={{ background: c }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button asChild variant="outline" className="h-11 rounded-xl sm:w-40">
          <Link to="/app/wallets">{t("common.cancel")}</Link>
        </Button>
        <Button type="submit" className="h-11 rounded-xl sm:w-48">
          {t("common.save")}
        </Button>
      </div>
    </form>
  );
}
