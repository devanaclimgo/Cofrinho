import { Link, useNavigate } from "react-router-dom";
import { useI18n } from "../../i18n/I18nContext";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Badge } from "../../components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  ArrowDownRight,
  ArrowUpRight,
  Download,
  Filter,
  MoreVertical,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { getTransactions, deleteTransaction } from "../../api/transactions";
import type { TransactionResponse } from "../../types/transaction";

export default function TransactionsPage() {
  const { t, formatCurrency, locale } = useI18n();
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);
  const [, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    getTransactions()
      .then((response) => setTransactions(response.data))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id: number) {
    const confirmed = window.confirm(t("transactions.confirmDelete"));
    if (!confirmed) return;

    setDeletingId(id);
    try {
      await deleteTransaction(id);
      setTransactions((prev) => prev.filter((tx) => tx.id !== id));
    } catch (error) {
      console.error(error);
      window.alert(t("transactions.deleteFailed"));
    } finally {
      setDeletingId(null);
    }
  }

  function handleEdit(id: number) {
    navigate(`/app/transactions/${id}/edit`);
  }

  function renderActions(tx: TransactionResponse) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-lg"
            disabled={deletingId === tx.id}
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleEdit(tx.id)}>
            <Pencil className="mr-2 h-4 w-4" />
            {locale === "pt" ? "Editar" : "Edit"}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleDelete(tx.id)}
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
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            {t("sidebar.transactions")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {locale === "pt"
              ? "Todas as suas movimentações em um só lugar"
              : "All of your money movements in one place"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-10 rounded-xl">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button asChild className="h-10 rounded-xl">
            <Link to="/app/transactions/new">
              <Plus className="mr-2 h-4 w-4" />
              {t("common.new")}
            </Link>
          </Button>
        </div>
      </div>

      <div className="card-elevated p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={t("common.search")}
              className="h-10 rounded-xl pl-9 border-transparent bg-muted/60"
            />
          </div>
          <Select>
            <SelectTrigger className="h-10 w-[140px] rounded-xl">
              <SelectValue placeholder={t("common.category")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="food">Food</SelectItem>
              <SelectItem value="rent">Rent</SelectItem>
              <SelectItem value="income">Income</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="h-10 w-[140px] rounded-xl">
              <SelectValue placeholder={t("common.wallet")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="nu">Nubank</SelectItem>
              <SelectItem value="itau">Itaú</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="h-10 rounded-xl">
            <Filter className="mr-2 h-4 w-4" />
            More
          </Button>
        </div>
      </div>

      {/* Desktop table */}
      <div className="card-elevated hidden overflow-hidden md:block">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-5 py-3 text-left font-medium">
                {t("common.date")}
              </th>
              <th className="px-5 py-3 text-left font-medium">Description</th>
              <th className="px-5 py-3 text-left font-medium">
                {t("common.category")}
              </th>
              <th className="px-5 py-3 text-left font-medium">
                {t("common.wallet")}
              </th>
              <th className="px-5 py-3 text-left font-medium">
                {t("common.status")}
              </th>
              <th className="px-5 py-3 text-right font-medium">
                {t("common.amount")}
              </th>
              <th className="px-5 py-3 text-right font-medium" />
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr
                key={tx.id}
                className="border-t border-border transition hover:bg-muted/30"
              >
                <td className="px-5 py-4 text-muted-foreground">
                  {new Date(tx.transaction_date).toLocaleDateString(
                    locale === "pt" ? "pt-BR" : "en-US",
                    { day: "2-digit", month: "short" },
                  )}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span
                      className={`grid h-8 w-8 place-items-center rounded-lg ${
                        tx.kind === "income"
                          ? "bg-success/10 text-success"
                          : "bg-destructive/10 text-destructive"
                      }`}
                    >
                      {tx.kind === "income" ? (
                        <ArrowDownRight className="h-4 w-4" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4" />
                      )}
                    </span>
                    <span className="font-medium">{tx.description}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-muted-foreground">
                  {tx.category}
                </td>
                <td className="px-5 py-4 text-muted-foreground">
                  {tx.wallet_id}
                </td>
                <td className="px-5 py-4">
                  <Badge
                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      tx.status === "completed"
                        ? "bg-success/10 text-success"
                        : "bg-warning/10 text-warning-foreground"
                    } hover:opacity-100`}
                  >
                    {tx.status}
                  </Badge>
                </td>
                <td
                  className={`px-5 py-4 text-right font-semibold ${tx.kind === "income" ? "text-success" : "text-foreground"}`}
                >
                  {tx.kind === "income" ? "+" : ""}
                  {formatCurrency(Math.abs(tx.amount))}
                </td>
                <td className="px-5 py-4 text-right">{renderActions(tx)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="card-elevated flex items-center gap-3 p-4"
          >
            <span
              className={`grid h-10 w-10 place-items-center rounded-xl ${
                tx.kind === "income"
                  ? "bg-success/10 text-success"
                  : "bg-destructive/10 text-destructive"
              }`}
            >
              {tx.kind === "income" ? (
                <ArrowDownRight className="h-4 w-4" />
              ) : (
                <ArrowUpRight className="h-4 w-4" />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium">
                {tx.description}
              </div>
              <div className="truncate text-xs text-muted-foreground">
                {tx.category} · {tx.wallet_id}
              </div>
            </div>
            <div className="text-right">
              <div
                className={`text-sm font-semibold ${tx.kind === "income" ? "text-success" : "text-foreground"}`}
              >
                {tx.kind === "income" ? "+" : ""}
                {formatCurrency(Math.abs(tx.amount))}
              </div>
              <div className="text-[11px] text-muted-foreground">
                {new Date(tx.transaction_date).toLocaleDateString(
                  locale === "pt" ? "pt-BR" : "en-US",
                  { day: "2-digit", month: "short" },
                )}
              </div>
            </div>
            {renderActions(tx)}
          </div>
        ))}
      </div>
    </div>
  );
}
