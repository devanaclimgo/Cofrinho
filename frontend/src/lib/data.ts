import type { TranslationKey } from "../i18n/translations"

export type WalletType = "credit" | "debit" | "cash" | "savings" | "investment"

export interface Wallet {
  id: string
  name: string
  type: WalletType
  balance: number
  limit?: number
  used?: number
  color: string
  icon: string
}

export const wallets: Wallet[] = [
  { id: "w1", name: "Nubank", type: "credit", balance: 0, limit: 8000, used: 2340, color: "#8B5CF6", icon: "credit-card" },
  { id: "w2", name: "Conta Corrente", type: "debit", balance: 4820, color: "#2563EB", icon: "landmark" },
  { id: "w3", name: "Carteira", type: "cash", balance: 350, color: "#10B981", icon: "wallet" },
  { id: "w4", name: "Poupança", type: "savings", balance: 12500, color: "#F59E0B", icon: "piggy-bank" },
  { id: "w5", name: "Tesouro Direto", type: "investment", balance: 28900, color: "#EC4899", icon: "trending-up" },
  { id: "w6", name: "Inter", type: "credit", balance: 0, limit: 5000, used: 780, color: "#F97316", icon: "credit-card" },
]

export type TxType = "income" | "expense"
export type TxStatus = "completed" | "pending" | "scheduled"

export interface TransactionResponse {
  id: number;
  amount: number;
  category: TranslationKey;
  description: string;
  kind: "income" | "expense";
  walletId: string;
  transaction_date: string;
  icon: string;
  status: "completed" | "pending" | "scheduled";
}

export const transactions: TransactionResponse[] = [
  { id: 1, description: "Salário", category: "category.salary", kind: "income", amount: 7200, walletId: "w2", transaction_date: "2026-07-05", icon: "briefcase", status: "completed" },
  { id: 2, description: "Supermercado Pão de Açúcar", category: "category.food", kind: "expense", amount: 432.5, walletId: "w1", transaction_date: "2026-07-09", icon: "shopping-cart", status: "completed" },
  { id: 3, description: "Uber", category: "category.transport", kind: "expense", amount: 28.9, walletId: "w1", transaction_date: "2026-07-10", icon: "car", status: "completed" },
  { id: 4, description: "Aluguel", category: "category.housing", kind: "expense", amount: 1850, walletId: "w2", transaction_date: "2026-07-08", icon: "home", status: "completed" },
  { id: 5, description: "Netflix", category: "category.subscription", kind: "expense", amount: 44.9, walletId: "w1", transaction_date: "2026-07-11", icon: "clapperboard", status: "completed" },
  { id: 6, description: "Projeto freelance", category: "category.freelance", kind: "income", amount: 1500, walletId: "w2", transaction_date: "2026-07-07", icon: "laptop", status: "completed" },
  { id: 7, description: "Academia", category: "category.health", kind: "expense", amount: 99.9, walletId: "w2", transaction_date: "2026-07-06", icon: "dumbbell", status: "completed" },
  { id: 8, description: "Cinema", category: "category.entertainment", kind: "expense", amount: 68, walletId: "w3", transaction_date: "2026-07-04", icon: "film", status: "completed" },
  { id: 9, description: "Curso de inglês", category: "category.education", kind: "expense", amount: 320, walletId: "w2", transaction_date: "2026-07-12", icon: "graduation-cap", status: "completed" },
  { id: 10, description: "Amazon", category: "category.shopping", kind: "expense", amount: 259.9, walletId: "w1", transaction_date: "2026-07-03", icon: "package", status: "completed" },
  { id: 11, description: "Rendimento Tesouro", category: "category.investment", kind: "income", amount: 210.4, walletId: "w5", transaction_date: "2026-07-02", icon: "trending-up", status: "completed" },
  { id: 12, description: "Farmácia", category: "category.health", kind: "expense", amount: 87.3, walletId: "w3", transaction_date: "2026-07-01", icon: "cross", status: "completed" },
]

export interface WishlistItem {
  id: string
  name: string
  price: number
  storeUrl: string
  desiredDate: string
  priority: "high" | "medium" | "low"
  result: "canBuy" | "wait" | "notRecommended"
  image: string
}

export const wishlist: WishlistItem[] = [
  { id: "wl1", name: "iPhone 16 Pro", price: 9499, storeUrl: "apple.com", desiredDate: "2026-09-15", priority: "high", result: "wait", image: "phone" },
  { id: "wl2", name: "Cadeira Herman Miller", price: 8900, storeUrl: "hermanmiller.com", desiredDate: "2026-12-01", priority: "medium", result: "notRecommended", image: "armchair" },
  { id: "wl3", name: "Fone Sony WH-1000XM5", price: 2199, storeUrl: "sony.com", desiredDate: "2026-08-01", priority: "medium", result: "canBuy", image: "headphones" },
  { id: "wl4", name: "Monitor LG UltraFine", price: 3400, storeUrl: "lg.com", desiredDate: "2026-10-20", priority: "low", result: "wait", image: "monitor" },
  { id: "wl5", name: "Teclado Keychron Q1", price: 1299, storeUrl: "keychron.com", desiredDate: "2026-08-10", priority: "low", result: "canBuy", image: "keyboard" },
  { id: "wl6", name: "Viagem Portugal", price: 12000, storeUrl: "decolar.com", desiredDate: "2027-01-05", priority: "high", result: "notRecommended", image: "plane" },
]

export interface Goal {
  id: string
  titleKey?: string
  title: string
  target: number
  current: number
  targetDate: string
  monthlyContribution: number
  priority: "high" | "medium" | "low"
  color: string
  icon: string
}

export const goals: Goal[] = [
  { id: "g1", title: "Reserva de emergência", target: 30000, current: 18500, targetDate: "2027-03-01", monthlyContribution: 1200, priority: "high", color: "#2563EB", icon: "shield" },
  { id: "g2", title: "Viagem Europa", target: 15000, current: 6200, targetDate: "2027-06-01", monthlyContribution: 800, priority: "medium", color: "#F59E0B", icon: "plane" },
  { id: "g3", title: "PC Gamer", target: 12000, current: 9800, targetDate: "2026-10-01", monthlyContribution: 700, priority: "medium", color: "#EC4899", icon: "monitor" },
  { id: "g4", title: "Carro novo", target: 80000, current: 24000, targetDate: "2028-01-01", monthlyContribution: 2000, priority: "low", color: "#10B981", icon: "car" },
  { id: "g5", title: "Novo iPhone", target: 9500, current: 9500, targetDate: "2026-07-01", monthlyContribution: 0, priority: "low", color: "#8B5CF6", icon: "smartphone" },
]

// Chart datasets
export const forecastData = [
  { month: "Jul", balance: 4820, projected: 4820 },
  { month: "Ago", balance: 5600, projected: 5600 },
  { month: "Set", balance: 3200, projected: 3200 },
  { month: "Out", balance: 6100, projected: 6100 },
  { month: "Nov", balance: 7400, projected: 7400 },
  { month: "Dez", balance: 8900, projected: 8900 },
]

export const incomeVsExpenses = [
  { month: "Fev", income: 8200, expenses: 5600 },
  { month: "Mar", income: 8700, expenses: 6100 },
  { month: "Abr", income: 8400, expenses: 5900 },
  { month: "Mai", income: 9100, expenses: 6400 },
  { month: "Jun", income: 8900, expenses: 5700 },
  { month: "Jul", income: 8700, expenses: 5300 },
]

export const categoryBreakdown = [
  { key: "category.housing", value: 1850, color: "#2563EB" },
  { key: "category.food", value: 980, color: "#10B981" },
  { key: "category.transport", value: 430, color: "#F59E0B" },
  { key: "category.entertainment", value: 320, color: "#EC4899" },
  { key: "category.health", value: 287, color: "#8B5CF6" },
  { key: "category.subscription", value: 210, color: "#F97316" },
]

export const savingsRateData = [
  { month: "Fev", rate: 32 },
  { month: "Mar", rate: 30 },
  { month: "Abr", rate: 30 },
  { month: "Mai", rate: 30 },
  { month: "Jun", rate: 36 },
  { month: "Jul", rate: 39 },
]

export const cashFlowData = [
  { month: "Fev", flow: 2600 },
  { month: "Mar", flow: 2600 },
  { month: "Abr", flow: 2500 },
  { month: "Mai", flow: 2700 },
  { month: "Jun", flow: 3200 },
  { month: "Jul", flow: 3400 },
]

export interface NotificationItem {
  id: string
  category: "recommendation" | "bill" | "goal" | "reminder" | "report" | "wallet" | "simulation" | "warning"
  title: string
  message: string
  time: string
  read: boolean
  icon: string
}

export const notifications: NotificationItem[] = [
  { id: "n1", category: "recommendation", title: "Bom momento para comprar", message: "O fone Sony que você quer cabe no seu orçamento este mês.", time: "5 min", read: false, icon: "sparkles" },
  { id: "n2", category: "bill", title: "Fatura do Nubank vence em 3 dias", message: "R$ 2.340,00 com vencimento em 14/07.", time: "2 h", read: false, icon: "credit-card" },
  { id: "n3", category: "goal", title: "Meta quase concluída!", message: "Sua meta 'PC Gamer' está em 82%.", time: "1 d", read: false, icon: "target" },
  { id: "n4", category: "report", title: "Seu relatório de junho chegou", message: "Você economizou 36% da sua renda em junho.", time: "2 d", read: true, icon: "file-text" },
  { id: "n5", category: "warning", title: "Gasto acima da média", message: "Suas despesas com lazer subiram 24% este mês.", time: "3 d", read: true, icon: "triangle-alert" },
  { id: "n6", category: "simulation", title: "Simulação concluída", message: "Comprar o iPhone em outubro seria mais seguro.", time: "4 d", read: true, icon: "calculator" },
]

export const testimonials = [
  { name: "Mariana Silva", role: "Designer", text: "Finalmente entendi para onde vai meu dinheiro. O simulador me impede de fazer compras por impulso.", avatar: "MS" },
  { name: "Carlos Mendes", role: "Desenvolvedor", text: "A previsão de fluxo de caixa mudou como eu planejo minhas compras grandes. Simplesmente essencial.", avatar: "CM" },
  { name: "Ana Costa", role: "Empreendedora", text: "Interface linda e super fácil de usar. Consegui juntar minha reserva de emergência em 8 meses.", avatar: "AC" },
  { name: "Pedro Alves", role: "Estudante", text: "Como estudante, cada centavo conta. O Cofrinho me ajuda a decidir quando posso me dar um agrado.", avatar: "PA" },
]