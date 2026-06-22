module FinancialAnalysis
  class ExpenseCalculator
    
    def self.all(user)
      user.transactions
          .expense
          .average(:amount)
          &.to_f || 0
    end

  end
end