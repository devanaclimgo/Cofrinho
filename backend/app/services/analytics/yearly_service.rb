module Analytics
  class YearlyService
    def initialize(user:, year:, transaction_type:)
      @user = user
      @year = year
      @transaction_type = transaction_type
    end

    def call
      start_date = Date.new(@year, 1, 1)
      end_date   = start_date.end_of_year

      @user.transactions
           .where(transaction_type: @transaction_type)
           .where(occurred_on: start_date..end_date)
           .group("DATE_TRUNC('month', occurred_on)")
           .sum(:amount)
    end
  end
end