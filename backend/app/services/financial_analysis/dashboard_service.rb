module FinancialAnalysis
  class DashboardService
    def self.call(user)
      income = IncomeCalculator.call(user)
      expenses = ExpenseCalculator.call(user)
      {
        user: { name: user.name, email: user.email },
        summary: {
          balance: user.wallets.sum(:balance),
          income: income,
          expenses: expenses,
          savings: user.goals.sum(:current_amount)
        },
        wallets: user.wallets.order(created_at: :desc),
        transactions: user.transactions.order(transaction_date: :desc).limit(10),
        forecast: FutureProjection.call(user),
        top_category: most_used_category(user)
      }
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