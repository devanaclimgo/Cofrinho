class Api::V1::PurchaseValidationsController < Api::V1::BaseController
  def validate
    card = @current_user.cards.find(params[:card_id])

    result = Finance::SmartPurchaseValidator.new(
      user: @current_user,
      card: card,
      total_amount: params[:total_amount],
      installments_count: params[:installments_count],
      purchased_on: params[:purchased_on]
    ).call

    render json: result
  end
end