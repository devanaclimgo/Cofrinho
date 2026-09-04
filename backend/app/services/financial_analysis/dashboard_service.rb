module FinancialAnalysis
  class DashboardService
    def self.call(user)
      income = IncomeCalculator.call(user)
      expenses = ExpenseCalculator.call(user)
      savings_wallets = user.wallets.where(wallet_type: "savings")
      main_wallets = user.wallets.where.not(wallet_type: "savings")

      {
        user: { name: user.name, email: user.email },
        summary: {
          balance: main_wallets.sum(:balance).to_f,
          income: income,
          expenses: expenses,
          savings: savings_wallets.sum(:balance).to_f
        },
        wallets: user.wallets.order(created_at: :desc),
        transactions: user.transactions.order(transaction_date: :desc).limit(10),
        forecast: balance_forecast(user, income, expenses),
        wishlist: [],
        top_category: most_used_category(user)
      }
    end

    def self.balance_forecast(user, income, expenses)
      balance = user.wallets.sum(:balance).to_f
      monthly_net = income - expenses

      (1..12).map do |month|
        balance += monthly_net
        {
          m: (Date.current + month.months).strftime("%b"),
          balance: balance.round(2)
        }
      end
    end

    def self.most_used_category(user)
      user.transactions
          .group(:category)
          .count
          .max_by(&:last)
          &.first
    end
  end
end