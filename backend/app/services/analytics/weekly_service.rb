module Analytics
  class WeeklyService
    def initialize(user:, transaction_type:)
      @user = user
      @transaction_type = transaction_type
    end

    def call
      Rails.cache.fetch(cache_key, expires_in: 12.hours) do
        calculate
      end
    end

    private

    def calculate
      start_date = 1.week.ago.beginning_of_day
      end_date = Date.today.end_of_day

      @user.transactions
           .where(transaction_type: @transaction_type)
           .where(occurred_on: start_date..end_date)
           .group("DATE(occurred_on)")
           .sum(:amount)
    end

    def cache_key
      "analytics:weekly:user:#{@user.id}:#{@transaction_type}"
    end
  end
end