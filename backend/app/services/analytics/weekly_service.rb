module Analytics
  class WeeklyService
    def initialize(user:, transaction_type:)
      @user = user
      @transaction_type = transaction_type
    end

    def call
      @user.transactions
           .where(transaction_type: @transaction_type)
           .where(occurred_on: 1.week.ago.beginning_of_day..Date.today)
           .group("DATE(occurred_on)")
           .sum(:amount)
    end
  end
end