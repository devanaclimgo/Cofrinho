class FutureProjection
  
  def self.call(
    income:,
    expenses:,
    installments:,
    amount:
    )

    installment_value = amount/installments

    projections=[]

    installments.times do |month|
      balance = income - expenses - installment_value

      projections << {
        month: month + 1,
        balance: balance,
        status: status(balance)
      }
    end

    projections
  end

  def self.status(balance)
    return "red" if balance < 0
    return "yellow" if balance < 500

    "green"
  end

end