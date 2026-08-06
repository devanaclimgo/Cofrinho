import { AlertTriangle, RotateCw } from "lucide-react";
import { Link } from "react-router-dom";
import { useI18n } from "../../i18n/I18nContext";

interface ErrorStateProps {
  fullScreen?: boolean;
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export default function ErrorState({
  fullScreen = false,
  title,
  description,
  onRetry,
  className = "",
}: ErrorStateProps) {
  const { t } = useI18n();

  return (
    <div
      className={`flex items-center justify-center px-6 ${
        fullScreen ? "min-h-dvh" : "min-h-[240px] py-16"
      } ${className}`}
    >
      <div className="max-w-md text-center animate-fade-in-up">
        <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-2xl bg-destructive/10 text-destructive">
          <AlertTriangle className="h-7 w-7" strokeWidth={2.25} />
        </div>
        <h3 className="text-lg font-semibold tracking-tight text-foreground">
          {title ?? t("error.title")}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {description ?? t("error.desc")}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90"
            >
              <RotateCw className="h-4 w-4" />
              {t("error.retry")}
            </button>
          )}
          <Link
            to="/app/dashboard"
            className="inline-flex h-10 items-center justify-center rounded-xl border border-border bg-card px-4 text-sm font-medium text-foreground transition hover:bg-muted"
          >
            {t("nf.back")}
          </Link>
        </div>
      </div>
    </div>
  );
}