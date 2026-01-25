module Analytics
  class DailyBudgetService
    def initialize(user:)
      @user = user
    end

    def call
      today = Date.today
      start_date = today.beginning_of_month
      end_date = today.end_of_month

      income = total("income", start_date, end_date)
      expense = total("expense", start_date, end_date)

      remaining = income - expense
      days_left = (end_date - today).to_i + 1

      {
        remaining_balance: remaining,
        days_left: days_left,
        daily_budget: (remaining / days_left).round(2)
      }
    end

    private

    def total(type, start_date, end_date)
      @user.transactions
           .where(transaction_type: type)
           .where(occurred_on: start_date..end_date)
           .sum(:amount)
    end
  end
end