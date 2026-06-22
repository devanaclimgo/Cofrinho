module FinancialAnalysis
  class IncomeCalculator
    
    def self.call(user)
      user.transactions
          .income
          .average(:amount)
          &.to_f || 0
    end

  end
end