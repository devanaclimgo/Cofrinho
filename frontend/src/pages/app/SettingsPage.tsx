import { useNavigate } from "react-router-dom";
import { useI18n } from "../../i18n/I18nContext";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { Switch } from "../../components/ui/switch";
import { LanguageSwitcher } from "../../components/shared/LanguageSwitcher";
import { ThemeToggle } from "../../components/shared/ThemeToggle";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

export default function SettingsPage() {
  const { t, locale } = useI18n();
  const { deleteAccount } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    const confirmmDelete = window.confirm(t("settings.deleteConfirm"));

    if (!confirmmDelete) {
      return;
    }

    setLoading(true);
    setError("");
    try {
      await deleteAccount();

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate("/");
    } catch (error) {
      console.error(error);

      setError(t("settings.deleteError"));
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("settings.title")}
        </h2>
        <p className="text-sm text-muted-foreground">
          {locale === "pt"
            ? "Ajuste o Cofrinho ao seu jeito"
            : "Tune Cofrinho to your taste"}
        </p>
      </div>

      <section className="card-elevated p-6">
        <h3 className="text-sm font-semibold">{t("settings.profile")}</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <Label>{t("auth.name")}</Label>
            <Input
              defaultValue="Maria Almeida"
              className="mt-1 h-11 rounded-xl"
            />
          </div>
          <div>
            <Label>{t("auth.email")}</Label>
            <Input
              defaultValue="maria@example.com"
              className="mt-1 h-11 rounded-xl"
            />
          </div>
          <div>
            <Label>{t("auth.password")}</Label>
            <Input
              type="password"
              defaultValue="••••••••"
              className="mt-1 h-11 rounded-xl"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button className="h-10 rounded-xl">{t("common.save")}</Button>
        </div>
      </section>

      <section className="card-elevated p-6">
        <h3 className="text-sm font-semibold">{t("settings.appearance")}</h3>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <div className="text-sm font-medium">{t("settings.theme")}</div>
            <div className="text-xs text-muted-foreground">
              {locale === "pt"
                ? "Claro, escuro ou automático"
                : "Light, dark or system"}
            </div>
          </div>
          <ThemeToggle />
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <div className="text-sm font-medium">{t("settings.language")}</div>
            <div className="text-xs text-muted-foreground">🇧🇷 · 🇺🇸</div>
          </div>
          <LanguageSwitcher variant="outline" />
        </div>
      </section>

      <section className="card-elevated p-6">
        <h3 className="text-sm font-semibold">{t("settings.notifications")}</h3>
        <div className="mt-4 space-y-3">
          {[
            locale === "pt"
              ? "Recomendações de compra"
              : "Purchase recommendations",
            locale === "pt" ? "Contas próximas" : "Upcoming bills",
            locale === "pt" ? "Progresso de metas" : "Goal progress",
            locale === "pt" ? "Relatórios mensais" : "Monthly reports",
          ].map((l, i) => (
            <div
              key={l}
              className="flex items-center justify-between rounded-xl border border-border p-3"
            >
              <span className="text-sm">{l}</span>
              <Switch defaultChecked={i < 3} />
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
        <h3 className="text-sm font-semibold text-destructive">
          {t("settings.danger")}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          {t("settings.deleteDesc")}
        </p>
        {error && (
          <p
            style={{
              color: "red",
              fontSize: "0.675rem",
              paddingTop: "0.25rem",
            }}
          >
            {error}
          </p>
        )}
        <Button
          onClick={handleDeleteAccount}
          disabled={loading}
          variant="destructive"
          className="mt-4 h-10 rounded-xl"
        >
          <Trash2 className="mr-2 h-4 w-4" /> {t("sidebar.delete")}
        </Button>
      </section>
    </div>
  );
}
