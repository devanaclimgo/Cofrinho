class Api::V1::AnalyticsController < Api::V1::BaseController
  def monthly
    data = @current_user.transactions
      .where(transaction_type: "expense")
      .group("DATE_TRUNC('month', occurred_on)")
      .sum(:amount)

    render json: data
  end
end