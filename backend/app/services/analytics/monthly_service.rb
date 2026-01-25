module Analytics
  class MonthlyService
    def initialize(user:, month:, year:, transaction_type:)
      @user = user
      @month = month
      @year = year
      @transaction_type = transaction_type
    end

    def call
      Rails.cache.fetch(cache_key, expires_in: 12.hours) do
        calculate
      end
    end

    private

    def calculate
      start_date = Date.new(@year, @month, 1)
      end_date = start_date.end_of_month

      @user.transactions
           .where(transaction_type: @transaction_type)
           .where(occurred_on: start_date..end_date)
           .group("DATE(occurred_on)")
           .sum(:amount)
    end

    def cache_key
      "analytics:monthly:user:#{@user.id}:#{@transaction_type}:#{@year}-#{@month}"
    end
  end
end