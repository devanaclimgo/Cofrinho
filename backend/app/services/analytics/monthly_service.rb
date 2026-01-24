module Analytics
  class MonthlyService
    def initialize(user:, month:, year:, transaction_type:)
      @user = user
      @month = month
      @year = year
      @transaction_type = transaction_type
    end

    def call
      start_date = Date.new(@year, @month, 1)
      end_date   = start_date.end_of_month

      @user.transactions
           .where(transaction_type: @transaction_type)
           .where(occurred_on: start_date..end_date)
           .group("DATE(occurred_on)")
           .sum(:amount)
    end
  end
end