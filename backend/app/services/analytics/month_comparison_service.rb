module Analytics
  class MonthComparisonService
    def initialize(user:, transaction_type:)
      @user = user
      @transaction_type = transaction_type
    end

    def call
      current = total_for(Date.today.beginning_of_month)
      previous = total_for(1.month.ago.beginning_of_month)

      {
        current_month: current,
        previous_month: previous,
        difference: current - previous,
        percentage: percentage_change(previous, current)
      }
    end

    private

    def total_for(date)
      start_date = date
      end_date = date.end_of_month

      @user.transactions
           .where(transaction_type: @transaction_type)
           .where(occurred_on: start_date..end_date)
           .sum(:amount)
    end

    def percentage_change(old, new)
      return 0 if old.zero?
      (((new - old) / old) * 100).round(2)
    end
  end
end