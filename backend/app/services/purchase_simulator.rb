class PurchaseSimulator

  def self.call(user:, amount:, installments:)

    monthly_income =
      user.transactions
          .income
          .average(:amount)

    monthly_expenses =
      user.transactions
          .expense
          .average(:amount)

    installment_value =
      amount / installments

    projected = []

    installments.times do |month|

      balance =
      monthly_income -
      monthly_expenses -
      installment_value

      projected << {
        month: month + 1,
        balance: balance,
        status: define_status(balance)
      }

    end

    projected

  end

  def self.define_status(balance)

    return "red" if balance < 0
    return "yellow" if balance < 500

    "green"

  end

end