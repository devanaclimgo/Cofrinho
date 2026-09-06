module FinancialAnalysis
  class ExpenseCalculator
    def self.call(user, month: Date.current)
      user.transactions
          .where(kind: "expense", status: "completed")
          .where(transaction_date: month.beginning_of_month..month.end_of_month)
          .sum(:amount)
          .to_f
    end
  end
end