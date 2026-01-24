module Analytics
  class ByCategoryService
    def initialize(user:, transaction_type:, start_date:, end_date:)
      @user = user
      @transaction_type = transaction_type
      @start_date = start_date
      @end_date = end_date
    end

    def call
      @user.transactions
           .where(transaction_type: @transaction_type)
           .where(occurred_on: @start_date..@end_date)
           .group(:category)
           .sum(:amount)
    end
  end
end