module Analytics
  class YearlyService
    def initialize(user:, year:, transaction_type:)
      @user = user
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
      start_date = Date.new(@year, 1, 1)
      end_date   = start_date.end_of_year

      @user.transactions
           .where(transaction_type: @transaction_type)
           .where(occurred_on: start_date..end_date)
           .group("DATE_TRUNC('month', occurred_on)")
           .sum(:amount)
    end

    def cache_key
      "analytics:yearly:user:#{@user.id}:#{@transaction_type}:#{@year}"
    end
  end
end