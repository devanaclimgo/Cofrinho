class DashboardService
  
  def self.call(user)
    income = IncomeCalculator.call(user)

    expenses = ExpenseCalculator.call(user)

    {
      monthly_income: income,

      monthly_expenses: expenses,

      remaining_balance: income-expenses,

      expenses_growth: 0,

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