class PurchaseSimulator

  def self.call(
      user:, 
      amount:, 
      installments:
    )

    income = IncomeCalculator.call(user)

    expenses = ExpenseCalculator.call(user)

    FutureProjection.call(
      income: income,
      expenses: expenses,
      amount: amount,
      installments: installments
    )

  end
end