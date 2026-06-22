class IncomeCalculator
  
  def self.all(user)
    user.transactions
        .income
        .average(:amount)
        &.to_f || 0
  end

end