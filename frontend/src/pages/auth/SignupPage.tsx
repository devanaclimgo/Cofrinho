import { Link } from "@tanstack/react-router";
import { AuthShell } from "../auth/AuthShell";
import { useI18n } from "../../i18n/I18nContext";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function SignupPage() {
  const { t } = useI18n();
  const [show, setShow] = useState(false);
  return (
    <AuthShell title={t("auth.signup.title")} subtitle={t("auth.signup.subtitle")}>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-1.5">
          <Label htmlFor="name">{t("auth.name")}</Label>
          <Input id="name" placeholder="Maria Almeida" className="h-11 rounded-xl" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">{t("auth.email")}</Label>
          <Input id="email" type="email" placeholder="you@company.com" className="h-11 rounded-xl" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">{t("auth.password")}</Label>
          <div className="relative">
            <Input id="password" type={show ? "text" : "password"} placeholder="At least 8 characters" className="h-11 rounded-xl pr-10" />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              aria-label={show ? "Hide password" : "Show password"}
              className="absolute inset-y-0 right-2 grid w-8 place-items-center text-muted-foreground hover:text-foreground"
            >
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <p className="text-xs text-muted-foreground">Use 8+ characters with a mix of letters and numbers.</p>
        </div>
        <Button asChild className="h-11 w-full rounded-xl">
          <Link to="/onboarding">{t("auth.signup.button")}</Link>
        </Button>
        <div className="relative py-2 text-center text-xs text-muted-foreground">
          <span className="bg-card px-2">{t("auth.or")}</span>
          <span className="absolute inset-x-0 top-1/2 -z-10 h-px bg-border" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" className="h-11 rounded-xl">Google</Button>
          <Button variant="outline" className="h-11 rounded-xl">Apple</Button>
        </div>
        <p className="pt-2 text-center text-sm text-muted-foreground">
          {t("auth.have")}{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            {t("nav.login")}
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
