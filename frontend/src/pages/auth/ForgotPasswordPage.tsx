import { Link } from "@tanstack/react-router";
import { AuthShell } from "../auth/AuthShell";
import { useI18n } from "../../i18n/I18nContext";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";

export default function ForgotPage() {
  const { t } = useI18n();
  return (
    <AuthShell title={t("auth.forgot.title")} subtitle={t("auth.forgot.subtitle")}>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-1.5">
          <Label htmlFor="email">{t("auth.email")}</Label>
          <Input id="email" type="email" placeholder="you@company.com" className="h-11 rounded-xl" />
        </div>
        <Button className="h-11 w-full rounded-xl">{t("auth.forgot.button")}</Button>
        <p className="pt-2 text-center text-sm text-muted-foreground">
          <Link to="/login" className="font-medium text-primary hover:underline">
            ← {t("nav.login")}
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
