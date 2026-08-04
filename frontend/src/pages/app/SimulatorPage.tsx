import { useI18n } from "../../i18n/I18nContext";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Calculator,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
} from "lucide-react";
import { useState } from "react";
import { usePurchaseSimulation } from "../../hooks/useSimulation";

// TODO: Add data to the backend and fetch it from there instead of using mock data. For now, we are using mock data.

const statusMap = {
  green: {
    color: "text-success",
    bg: "bg-success/10",
    border: "border-success/30",
    Icon: CheckCircle2,
    dot: "bg-success",
  },
  yellow: {
    color: "text-warning-foreground",
    bg: "bg-warning/10",
    border: "border-warning/30",
    Icon: AlertTriangle,
    dot: "bg-warning",
  },
  red: {
    color: "text-destructive",
    bg: "bg-destructive/10",
    border: "border-destructive/30",
    Icon: XCircle,
    dot: "bg-destructive",
  },
} as const;

export default function SimulatorPage() {
  const { t, locale } = useI18n();
  const [ran, setRan] = useState(false);
  const simulation = usePurchaseSimulation();
  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState("");
  const [installments, setInstallments] = useState("6");
  const [wallet_id, setWalletId] = useState("");

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("sim.title")}
        </h2>
        <p className="text-sm text-muted-foreground">
          {locale === "pt"
            ? "Descreva a compra e veremos o impacto nos próximos 6 meses."
            : "Describe the purchase and we'll show the impact for the next 6 months."}
        </p>
      </div>

      <div className="card-elevated p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label>{t("sim.product")}</Label>
            <Input
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              placeholder="Sony WH-1000XM6"
              className="mt-1 h-11 rounded-xl"
            />
          </div>
          <div>
            <Label>{t("sim.price")}</Label>
            <Input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="2799"
              className="mt-1 h-11 rounded-xl"
            />
          </div>
          <div>
            <Label>{t("sim.installments")}</Label>
            <Select value={installments} onValueChange={setInstallments}>
              <SelectTrigger className="mt-1 h-11 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 6, 10, 12].map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n}x
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>{t("sim.method")}</Label>
            <Select value={wallet_id} onValueChange={setWalletId}>
              <SelectTrigger className="mt-1 h-11 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="credit">{t("sim.card")}</SelectItem>
                <SelectItem value="cash">{t("sim.cash")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>{t("sim.date")}</Label>
            <Input type="date" className="mt-1 h-11 rounded-xl" />
          </div>
        </div>
        <Button
          onClick={() => {
            simulation.mutate({
              product: product || "",
              amount: parseFloat(amount) || 0,
              installments: parseInt(installments) || 6,
              wallet_id: wallet_id || "",
            });
            setRan(true);
          }}
          className="mt-6 h-11 w-full rounded-xl sm:w-auto sm:px-8"
        >
          <Calculator className="mr-2 h-4 w-4" /> {t("sim.run")}
        </Button>
      </div>

      {ran && (
        <div className="animate-fade-in-up space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">{t("sim.result")}</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {simulation.data &&
              simulation.data.months.map((m) => {
                const s = statusMap[m.status];
                return (
                  <div
                    key={m.month}
                    className={`rounded-2xl border ${s.border} bg-card p-4 text-center transition hover:-translate-y-0.5`}
                  >
                    <div className={`mx-auto h-2 w-2 rounded-full ${s.dot}`} />
                    <div className="mt-3 text-sm font-semibold">{m.status}</div>
                    <s.Icon className={`mx-auto mt-2 h-4 w-4 ${s.color}`} />
                    <div className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
                      {m.balance}
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="card-elevated flex items-start gap-3 p-5">
            <Info className="mt-0.5 h-4 w-4 text-primary" />
            <div className="text-sm text-foreground">
              {locale === "pt"
                ? "Recomendação: adie para outubro. Sua margem de segurança fica 42% maior."
                : "Recommendation: postpone to October. Your safety margin will be 42% higher."}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
