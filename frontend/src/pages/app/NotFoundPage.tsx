import { Link, useNavigate } from "react-router-dom";
import { ThemeProvider } from "../../lib/ThemeContext";
import { I18nProvider, useI18n } from "../../i18n/I18nContext";

export default function NotFoundComponent() {
  return <NotFoundInner />;
}

function NotFoundInner() {
  const { t } = useI18n();
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-6">
      <div className="max-w-md text-center animate-fade-in-up">
        <div className="mx-auto mb-8 grid h-24 w-24 place-items-center rounded-3xl bg-primary/10 text-primary text-4xl font-bold">
          404
        </div>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          {t("nf.title")}
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">{t("nf.desc")}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/app/dashboard"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90"
          >
            {t("nf.back")}
          </Link>
          <Link
            to="/"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-card px-5 text-sm font-medium text-foreground transition hover:bg-muted"
          >
            {t("nf.home")}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const navigate = useNavigate();

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong. You can try again or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              navigate("/app/dashboard");
              reset();
            }}
            className="inline-flex h-10 items-center justify-center rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-xl border border-border bg-card px-4 text-sm font-medium text-foreground transition hover:bg-muted"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = {
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Cofrinho — Plan before you spend" },
      {
        name: "description",
        content:
          "Cofrinho is a financial planning and purchase simulation platform. Simulate purchases, forecast your money and decide with confidence.",
      },
      { name: "author", content: "Cofrinho" },
      { property: "og:title", content: "Cofrinho — Plan before you spend" },
      {
        property: "og:description",
        content:
          "Simulate purchases, forecast your money and make smarter financial decisions every day.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Cofrinho — Plan before you spend" },
    ],
    links: [
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
};

function RootComponent() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <NotFoundInner />
      </I18nProvider>
    </ThemeProvider>
  );
}
