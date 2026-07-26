import { useI18n } from "../../i18n/I18nContext";
import { faqs } from "../../lib/mock-data";
import { Input } from "../../components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { Search, LifeBuoy } from "lucide-react";

export default function FaqPage() {
  const { t, locale } = useI18n();
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
          <LifeBuoy className="h-6 w-6" />
        </div>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight">
          {locale === "pt" ? "Como podemos ajudar?" : "How can we help?"}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {locale === "pt"
            ? "Encontre respostas rápidas para dúvidas comuns"
            : "Find quick answers to common questions"}
        </p>
      </div>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder={t("common.search")}
          className="h-12 rounded-xl pl-10"
        />
      </div>
      <div className="card-elevated overflow-hidden p-2">
        <Accordion type="single" collapsible>
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`i${i}`}
              className="border-border last:border-b-0 px-4"
            >
              <AccordionTrigger className="text-left text-sm font-medium">
                {f.q[locale]}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {f.a[locale]}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
