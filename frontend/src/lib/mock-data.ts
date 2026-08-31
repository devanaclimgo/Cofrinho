export const forecastData = [
  { m: "Jan", balance: 3200, income: 5200, expenses: 3800 },
  { m: "Feb", balance: 3800, income: 5300, expenses: 3900 },
  { m: "Mar", balance: 4400, income: 5400, expenses: 4100 },
  { m: "Apr", balance: 5100, income: 5500, expenses: 4200 },
  { m: "May", balance: 5900, income: 5600, expenses: 4300 },
  { m: "Jun", balance: 6600, income: 5700, expenses: 4400 },
  { m: "Jul", balance: 7400, income: 5800, expenses: 4400 },
  { m: "Aug", balance: 8100, income: 5900, expenses: 4500 },
  { m: "Sep", balance: 8600, income: 6000, expenses: 4900 },
  { m: "Oct", balance: 9400, income: 6100, expenses: 4700 },
  { m: "Nov", balance: 10300, income: 6200, expenses: 4800 },
  { m: "Dec", balance: 11400, income: 6400, expenses: 4900 },
];

export const categoryData = [
  { name: "Food", value: 1240, color: "var(--chart-1)" },
  { name: "Rent", value: 1800, color: "var(--chart-2)" },
  { name: "Transport", value: 380, color: "var(--chart-3)" },
  { name: "Leisure", value: 520, color: "var(--chart-4)" },
  { name: "Health", value: 210, color: "var(--chart-5)" },
];

export type Wallet = {
  id: string;
  name: string;
  type: "credit" | "debit" | "cash" | "savings" | "investment";
  balance: number;
  limit?: number;
  color: string;
  last4?: string;
};

export const wallets: Wallet[] = [
  { id: "w1", name: "Nubank Credit", type: "credit", balance: 1240, limit: 5000, color: "#7C3AED", last4: "4821" },
  { id: "w2", name: "Itaú Checking", type: "debit", balance: 3820, color: "#2563EB", last4: "1102" },
  { id: "w3", name: "Cash", type: "cash", balance: 320, color: "#059669" },
  { id: "w4", name: "Emergency Fund", type: "savings", balance: 8400, color: "#F59E0B" },
  { id: "w5", name: "Portfolio", type: "investment", balance: 14200, color: "#EC4899" },
];

export type Goal = {
  id: string;
  title: string;
  target: number;
  current: number;
  targetDate: string;
  monthly: number;
  priority: "high" | "medium" | "low";
  color: string;
  emoji: string;
};

export const goals: Goal[] = [
  { id: "g1", title: "Emergency Fund", target: 15000, current: 8400, targetDate: "2027-01", monthly: 800, priority: "high", color: "#2563EB", emoji: "🛟" },
  { id: "g2", title: "Trip to Japan", target: 12000, current: 3200, targetDate: "2027-05", monthly: 900, priority: "medium", color: "#EC4899", emoji: "🗾" },
  { id: "g3", title: "Gaming PC", target: 8000, current: 5800, targetDate: "2026-11", monthly: 600, priority: "medium", color: "#7C3AED", emoji: "🎮" },
  { id: "g4", title: "New Car", target: 45000, current: 12300, targetDate: "2028-03", monthly: 1200, priority: "low", color: "#059669", emoji: "🚗" },
];

export type Notif = {
  id: string;
  title: string;
  body: string;
  time: string;
  category: "purchase" | "bill" | "goal" | "reminder" | "report" | "wallet" | "sim" | "warning";
  read: boolean;
};

export const notifications: Notif[] = [
  { id: "n1", title: "Good news!", body: "You can safely buy the Kindle Colorsoft this month.", time: "2m", category: "purchase", read: false },
  { id: "n2", title: "Upcoming bill", body: "Electricity bill $124.30 due in 3 days.", time: "1h", category: "bill", read: false },
  { id: "n3", title: "Emergency Fund", body: "You've reached 56% of your goal 🎉", time: "5h", category: "goal", read: false },
  { id: "n4", title: "Monthly report ready", body: "Your June financial summary is available.", time: "1d", category: "report", read: true },
  { id: "n5", title: "Wallet alert", body: "Nubank Credit is at 78% of its limit.", time: "2d", category: "warning", read: true },
];

export const calendarEvents = [
  { day: 3, title: "Salary", type: "income", color: "#059669" },
  { day: 7, title: "Rent", type: "bill", color: "#EF4444" },
  { day: 10, title: "Netflix", type: "subscription", color: "#7C3AED" },
  { day: 12, title: "Credit card", type: "bill", color: "#EF4444" },
  { day: 15, title: "Goal contribution", type: "goal", color: "#2563EB" },
  { day: 20, title: "Gym", type: "subscription", color: "#7C3AED" },
  { day: 25, title: "Freelance", type: "income", color: "#059669" },
  { day: 28, title: "Internet", type: "bill", color: "#EF4444" },
];

export const faqs = [
  {
    q: { pt: "O Cofrinho é um banco?", en: "Is Cofrinho a bank?" },
    a: {
      pt: "Não. O Cofrinho é uma plataforma de planejamento financeiro e simulação de compras. Não guardamos seu dinheiro nem realizamos transferências.",
      en: "No. Cofrinho is a financial planning and purchase simulation platform. We don't hold your money or move funds.",
    },
  },
  {
    q: { pt: "Como funciona o simulador de compras?", en: "How does the purchase simulator work?" },
    a: {
      pt: "Você informa o produto, valor e forma de pagamento. Projetamos o impacto nos próximos meses considerando suas receitas, despesas e metas.",
      en: "You enter the product, price and payment method. We project the impact over the coming months using your income, expenses and goals.",
    },
  },
  {
    q: { pt: "Meus dados estão seguros?", en: "Is my data safe?" },
    a: {
      pt: "Sim. Usamos criptografia de ponta a ponta e nunca compartilhamos seus dados com terceiros.",
      en: "Yes. We use end-to-end encryption and never share your data with third parties.",
    },
  },
  {
    q: { pt: "Posso cancelar a qualquer momento?", en: "Can I cancel any time?" },
    a: {
      pt: "Sim. Você pode cancelar o plano e excluir sua conta a qualquer momento, sem multas.",
      en: "Yes. You can cancel your plan and delete your account any time — no penalties.",
    },
  },
  {
    q: { pt: "Funciona para casais e famílias?", en: "Does it work for couples and families?" },
    a: {
      pt: "Sim, o plano Família permite compartilhar carteiras e metas com até 5 pessoas.",
      en: "Yes — the Family plan lets you share wallets and goals with up to 5 people.",
    },
  },
];
