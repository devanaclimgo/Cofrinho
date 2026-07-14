import { Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/auth/LoginPage"
import SignupPage from "./pages/auth/SignupPage"
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage"
import OnboardingPage from "./pages/OnboardingPage"
import { AppRouteOutlet } from "./components/app-layout"
import DashboardPage from "./pages/app/DashboardPage"
import TransactionsPage from "./pages/app/TransactionsPage"
import WalletsPage from "./pages/app/WalletsPage"
import WishlistPage from "./pages/app/WishlistPage"
import SimulatorPage from "./pages/app/SimulatorPage"
import AnalyticsPage from "./pages/app/AnalyticsPage"
import GoalsPage from "./pages/app/GoalsPage"
import CalendarPage from "./pages/app/CalendarPage"
import FinancialProfilePage from "./pages/app/FinancialProfilePage"
import SettingsPage from "./pages/app/SettingsPage"
import FaqPage from "./pages/app/FaqPage"
import NotFoundComponent from "./pages/app/NotFoundPage"

export function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/app" element={<AppRouteOutlet title="Cofrinho" />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/wallets" element={<WalletsPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/simulator" element={<SimulatorPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/goals" element={<GoalsPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/profile" element={<FinancialProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/faq" element={<FaqPage />} />
      </Route>
      <Route path="*" element={<NotFoundComponent />} />
    </Routes>
  )
}
