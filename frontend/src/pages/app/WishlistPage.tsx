import { useI18n } from "../../i18n/I18nContext";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Calculator, Plus, ExternalLink } from "lucide-react";
import { useWishlist } from "../../hooks/useWishlist";

export default function WishlistPage() {
  const { t, formatCurrency, locale } = useI18n();
  const { data, isLoading } = useWishlist();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            {t("wishlist.title")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {locale === "pt"
              ? "O que você quer, quando faz sentido comprar"
              : "What you want, when it makes sense to buy"}
          </p>
        </div>
        <Button className="h-10 rounded-xl">
          <Plus className="mr-2 h-4 w-4" />
          {t("wishlist.new")}
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.map((w) => {
          const verdict = w.verdict;
          const map = {
            buy: {
              label: t("wishlist.buyNow"),
              cls: "bg-success/10 text-success",
            },
            wait: {
              label: t("wishlist.wait"),
              cls: "bg-warning/10 text-warning-foreground",
            },
            save: {
              label: t("wishlist.notRec"),
              cls: "bg-destructive/10 text-destructive",
            },
          } as const;
          const v = map[verdict];
          return (
            <div key={w.id} className="card-elevated overflow-hidden">
              <div className="grid h-40 place-items-center bg-muted text-6xl">
                {w.imageUrl ? (
                  <img
                    src={w.imageUrl}
                    alt={w.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-4xl">🛒</span>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="truncate text-base font-semibold">
                      {w.name}
                    </div>
                    <a
                      href="#"
                      className="mt-0.5 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                    >
                      {w.store} <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                  <Badge
                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${v.cls} hover:${v.cls}`}
                  >
                    {v.label}
                  </Badge>
                </div>
                <div className="mt-4 flex items-baseline justify-between">
                  <div className="text-lg font-semibold tracking-tight">
                    {formatCurrency(w.price ?? 0)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {locale === "pt" ? "para" : "for"} {w.desiredDate}
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="mt-4 h-10 w-full rounded-xl"
                >
                  <Calculator className="mr-2 h-4 w-4" /> {t("wishlist.run")}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
