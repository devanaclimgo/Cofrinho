module PurchaseSimulator
  class PurchaseSimulator

    def self.call(
        user:, 
        amount:, 
        installments:
      )

      income = FinancialAnalysis::IncomeCalculator.call(user)

      expenses = FinancialAnalysis::ExpenseCalculator.call(user)

      FinancialAnalysis::FutureProjection.call(
        income: income,
        expenses: expenses,
        amount: amount,
        installments: installments
      )

    end
  end
end