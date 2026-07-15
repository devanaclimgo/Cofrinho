import { Input } from "../components/ui/input";
import { type Currency } from "../types/currency";

interface CurrencyInputProps {
  currency: Currency;
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

export function CurrencyInput({
  currency,
  value,
  onChange,
  className,
}: CurrencyInputProps) {
  const locale = currency === "BRL" ? "pt-BR" : "en-US";

  const format = (amount: number) =>
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // mantém apenas números
    const digits = e.target.value.replace(/\D/g, "");

    // transforma em valor monetário
    const amount = Number(digits || "0") / 100;

    onChange(amount);
  };

  return (
    <Input
      inputMode="numeric"
      autoComplete="off"
      value={format(value)}
      onChange={handleChange}
      className={
        className ??
        "h-14 rounded-xl text-2xl font-semibold tracking-tight"
      }
    />
  );
}