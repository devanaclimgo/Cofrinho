import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useI18n } from "../../i18n/I18nContext";
import { Button } from "../../components/ui/button";
import { Calculator, Plus, ExternalLink } from "lucide-react";
import type { WishlistItem } from "../../types/wishlist";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import { getWishlists } from "../../api/wishlist";

export default function WishlistPage() {
  const { t, formatCurrency, locale } = useI18n();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadWishlist() {
      try {
        setLoading(true);
        setError(null);

        const { data } = await getWishlists();
        setWishlist(data);
      } catch {
        setError(t("wishlist.load"));
      } finally {
        setLoading(false);
      }
    }

    loadWishlist();
  }, [locale, t]);

  if (loading) {
    return <LoadingState fullScreen label={t("dash.loading")} />;
  }

  if (error) {
    return (
      <ErrorState
        fullScreen
        onRetry={() => {
          window.location.reload();
        }}
      />
    );
  }

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="h-72 animate-pulse rounded-2xl bg-muted" />
        ))}
      </div>
    );
  }

  function normalizeUrl(url: string) {
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }

    return `https://${url}`;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            {t("wishlist.title")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t("wishlist.subTitle")}
          </p>
        </div>
        <Button asChild className="h-10 rounded-xl">
          <Link to="/app/wishlist/new">
            <Plus className="mr-2 h-4 w-4" />
            {t("wishlist.new")}
          </Link>
        </Button>
      </div>
      {wishlist.length === 0 && (
        <div className="card-elevated flex min-h-72 flex-col items-center justify-center p-8 text-center">
          <div className="mb-4 text-5xl">🛍️</div>

          <h3 className="text-lg font-semibold">{t("wishlist.empty")}</h3>

          <p className="mt-1 max-w-md text-sm text-muted-foreground">
            {t("wishlist.desc")}
          </p>

          <Button asChild className="mt-5 rounded-xl">
            <Link to="/app/wishlist/new">
              <Plus className="mr-2 h-4 w-4" />
              {t("wishlist.new")}
            </Link>
          </Button>
        </div>
      )}

      {wishlist.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlist.map((w) => (
            <div key={w.id} className="card-elevated overflow-hidden">
              <div className="grid h-40 place-items-center bg-muted text-6xl">
                {w.image}
              </div>

              <div className="p-5">
                <div className="min-w-0">
                  <div className="truncate text-base font-semibold">
                    {w.name}
                  </div>

                  {w.store && (
                    <a
                      href={normalizeUrl(w.store)}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-0.5 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                    >
                      {w.store}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>

                <div className="mt-4 flex items-baseline justify-between">
                  <div className="text-lg font-semibold tracking-tight">
                    {formatCurrency(w.price)}
                  </div>

                  <div className="text-xs text-muted-foreground">
                    {locale === "pt" ? "para" : "for"} {w.desired_date}
                  </div>
                </div>

                <Button
                  asChild
                  variant="outline"
                  className="mt-4 h-10 w-full rounded-xl"
                >
                  <Link
                    to={`/app/simulator?product=${encodeURIComponent(w.name)}&amount=${w.price}`}
                  >
                    <Calculator className="mr-2 h-4 w-4" />
                    {t("wishlist.run")}
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
