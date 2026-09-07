import { Link, useNavigate } from "react-router-dom";
import { useI18n } from "../../i18n/I18nContext";
import { Button } from "../../components/ui/button";
import {
  CreditCard,
  Banknote,
  PiggyBank,
  Landmark,
  TrendingUp,
  Plus,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { Wallet } from "../../types/wallet";
import { getWallets, deleteWallet } from "../../api/wallets";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

const iconFor = (t: string) =>
  t === "credit"
    ? CreditCard
    : t === "cash"
      ? Banknote
      : t === "savings"
        ? PiggyBank
        : t === "investment"
          ? TrendingUp
          : Landmark;

export default function WalletsPage() {
  const { t, formatCurrency, locale } = useI18n();
  const navigate = useNavigate();
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    getWallets()
      .then((response) => setWallets(response.data))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id: string) {
    const confirmed = window.confirm(t("wallets.confirmDelete"));
    if (!confirmed) return;

    setDeletingId(id);
    try {
      await deleteWallet(id);
      setWallets((prev) => prev.filter((w) => w.id !== id));
    } catch (error) {
      console.error(error);
      window.alert(t("wallets.deleteFailed"));
    } finally {
      setDeletingId(null);
    }
  }

  function handleEdit(id: string) {
    navigate(`/app/wallets/${id}/edit`);
  }

  function renderActions(w: Wallet) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-lg"
            disabled={deletingId === w.id}
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleEdit(w.id)}>
            <Pencil className="mr-2 h-4 w-4" />
            {locale === "pt" ? "Editar" : "Edit"}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleDelete(w.id)}
            className="text-destructive focus:text-destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            {locale === "pt" ? "Excluir" : "Delete"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            {t("sidebar.wallets")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {locale === "pt"
              ? "Cartões, contas e investimentos"
              : "Cards, accounts and investments"}
          </p>
        </div>
        <Button asChild className="h-10 rounded-xl">
          <Link to="/app/wallets/new">
            <Plus className="mr-2 h-4 w-4" />
            {t("common.new")}
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {wallets.map((w) => {
          const Icon = iconFor(w.wallet_type);
          const pct = w.limit ? Math.round((w.balance / w.limit) * 100) : null;
          return (
            <div
              key={w.id}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)]"
            >
              <div
                className="absolute -right-8 -top-10 h-32 w-32 rounded-full opacity-20 blur-2xl"
                style={{ backgroundColor: w.color }}
              />
              <div className="flex items-start justify-between">
                <span
                  className="grid h-11 w-11 place-items-center rounded-xl text-white shadow-sm"
                  style={{ backgroundColor: w.color }}
                >
                  <Icon className="h-5 w-5" />
                </span>

                {renderActions(w)}
              </div>
              <div className="mt-6">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  {w.name}
                </div>
                <div className="mt-1 text-2xl font-semibold tracking-tight">
                  {formatCurrency(w.balance)}
                </div>
                <div className="text-xs text-muted-foreground">
                  {w.wallet_type}
                  {w.last4 ? ` · •• ${w.last4}` : ""}
                </div>
              </div>
              {pct !== null && (
                <div className="mt-5">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">
                      {locale === "pt" ? "Uso do limite" : "Limit usage"}
                    </span>
                    <span className="font-medium">{pct}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${pct}%`,
                        backgroundColor:
                          pct > 80 ? "var(--destructive)" : w.color,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Add new wallet placeholder */}
        <Link
          to="/app/wallets/new"
          className="grid min-h-[220px] place-items-center rounded-2xl border-2 border-dashed border-border bg-transparent p-6 text-muted-foreground transition hover:border-primary hover:bg-primary/5 hover:text-primary"
        >
          <div className="text-center">
            <div className="mx-auto grid h-11 w-11 place-items-center rounded-xl bg-muted">
              <Plus className="h-5 w-5" />
            </div>
            <div className="mt-3 text-sm font-medium">
              {locale === "pt" ? "Adicionar carteira" : "Add wallet"}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
