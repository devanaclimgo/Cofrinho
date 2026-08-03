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
import { ArrowLeft, Calculator } from "lucide-react";
import { toast } from "sonner";

const emojis = ["🎧", "📱", "📚", "🪑", "💻", "⌚", "📷", "🚲", "🎸", "🛋️"];

export default function NewWishlistPage() {
  const { t, locale, formatCurrency } = useI18n();
  const navigate = useNavigate();
  const pt = locale === "pt";
  const [emoji, setEmoji] = useState(emojis[0]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const priceN = Number(price.replace(",", ".")) || 0;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        toast.success(
          pt ? "Item adicionado à lista" : "Item added to wishlist",
          { description: name },
        );
        navigate("/app/wishlist");
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
          <Link to="/app/wishlist" aria-label={t("common.cancel")}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            {pt ? "Novo desejo" : "New wishlist item"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {pt
              ? "Descubra quando faz sentido comprar"
              : "Find out when it makes sense to buy"}
          </p>
        </div>
      </div>

      <div className="card-elevated space-y-6 p-6">
        <div className="flex items-center gap-4">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-muted text-3xl">
            {emoji}
          </div>
          <div className="flex flex-wrap gap-2">
            {emojis.map((e) => (
              <button
                key={e}
                type="button"
                onClick={() => setEmoji(e)}
                className={`h-9 w-9 rounded-xl text-lg transition ${emoji === e ? "bg-primary/10 ring-2 ring-primary" : "hover:bg-muted"}`}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="wname">{pt ? "Item" : "Item"}</Label>
            <Input
              id="wname"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={pt ? "Ex.: Fone Sony" : "e.g. Sony headphones"}
              className="h-11 rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">{pt ? "Preço" : "Price"}</Label>
            <Input
              id="price"
              required
              inputMode="decimal"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="2799"
              className="h-11 rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="store">{pt ? "Loja / link" : "Store / link"}</Label>
            <Input
              id="store"
              placeholder="amazon.com.br"
              className="h-11 rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="desired">
              {pt ? "Quero comprar em" : "Desired date"}
            </Label>
            <Input
              id="desired"
              type="month"
              defaultValue="2026-09"
              className="h-11 rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label>{pt ? "Prioridade" : "Priority"}</Label>
            <Select defaultValue="medium">
              <SelectTrigger className="h-11 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">
                  {t("common.priority.high")}
                </SelectItem>
                <SelectItem value="medium">
                  {t("common.priority.medium")}
                </SelectItem>
                <SelectItem value="low">{t("common.priority.low")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-muted/50 p-4 text-sm">
          <span className="text-muted-foreground">
            {pt ? "Impacto estimado" : "Estimated impact"}:{" "}
            <strong className="text-foreground">
              {formatCurrency(priceN)}
            </strong>
          </span>
          <Button
            asChild
            type="button"
            variant="outline"
            className="h-10 rounded-xl"
          >
            <Link to="/app/simulator">
              <Calculator className="mr-2 h-4 w-4" />
              {pt ? "Simular compra" : "Run simulation"}
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button asChild variant="outline" className="h-11 rounded-xl sm:w-40">
          <Link to="/app/wishlist">{t("common.cancel")}</Link>
        </Button>
        <Button type="submit" className="h-11 rounded-xl sm:w-48">
          {t("common.save")}
        </Button>
      </div>
    </form>
  );
}
