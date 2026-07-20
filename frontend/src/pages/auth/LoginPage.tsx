import { Link, useNavigate } from "react-router-dom";
import { AuthShell } from "../auth/AuthShell";
import { useI18n } from "../../i18n/I18nContext";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

export default function LoginPage() {
  const { t } = useI18n();
  const { login } = useAuth();
  const nav = useNavigate();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      nav("/app/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.error ?? "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell title={t("auth.login.title")} subtitle={t("auth.login.subtitle")}>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-1.5">
          <Label htmlFor="email">{t("auth.email")}</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="h-11 rounded-xl" />
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">{t("auth.password")}</Label>
            <Link to="/forgot-password" className="text-xs text-primary hover:underline">
              {t("auth.forgot")}
            </Link>
          </div>
          <div className="relative">
            <Input id="password" type={show ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="h-11 rounded-xl pr-10" />
            <button type="button" onClick={() => setShow((v) => !v)} aria-label={show ? "Hide password" : "Show password"} className="absolute inset-y-0 right-2 grid w-8 place-items-center text-muted-foreground hover:text-foreground">
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit" disabled={loading} className="h-11 w-full rounded-xl">
          {loading ? "..." : t("auth.login.button")}
        </Button>
        <div className="relative py-2 text-center text-xs text-muted-foreground">
          <span className="bg-card px-2">{t("auth.or")}</span>
          <span className="absolute inset-x-0 top-1/2 -z-10 h-px bg-border" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" className="h-11 rounded-xl" type="button">Google</Button>
          <Button variant="outline" className="h-11 rounded-xl" type="button">Apple</Button>
        </div>
        <p className="pt-2 text-center text-sm text-muted-foreground">
          {t("auth.dont")}{" "}
          <Link to="/signup" className="font-medium text-primary hover:underline">{t("nav.signup")}</Link>
        </p>
      </form>
    </AuthShell>
  );
}