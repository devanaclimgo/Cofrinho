module FinancialAnalysis
  class IncomeCalculator
    def self.call(user, month: Date.current)
      user.transactions
          .where(kind: "income", status: "completed")
          .where(transaction_date: month.beginning_of_month..month.end_of_month)
          .sum(:amount)
          .to_f
    end
  end
end