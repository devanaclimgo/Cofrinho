module Analytics
  class ByCategoryService
    def initialize(user:, transaction_type:, start_date:, end_date:)
      @user = user
      @transaction_type = transaction_type
      @start_date = start_date
      @end_date = end_date
    end

    def call
      Rails.cache.fetch(cache_key, expires_in: 12.hours) do
        calculate
      end
    end

    private

    def calculate
      @user.transactions
           .where(transaction_type: @transaction_type)
           .where(occurred_on: @start_date..@end_date)
           .group(:category)
           .sum(:amount)
    end

    def cache_key
      "analytics:by_category:user:#{@user.id}:#{@transaction_type}:#{@start_date}:#{@end_date}"
    end
  end
end