class InstallmentGenerator

  def self.call(transaction:, total_installments:)

    value = transaction.amount / total_installments

    total_installments.times do |i|

      Installment.create!(
        financial_transaction: transaction,
        amount: value,
        current_installment: i + 1,
        total_installments: total_installments,
        due_date: Date.today + i.months
      )

    end

  end
end