class Api::V1::CardPurchasesController < Api::V1::BaseController
  def create
    card = @current_user.cards.find(params[:card_id])

    purchase = card.card_purchases.new(purchase_params)

    if purchase.save
      render json: purchase, status: :created
    else
      render json: { errors: purchase.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def purchase_params
    params.require(:card_purchase).permit(
      :description,
      :total_amount,
      :installments_count,
      :interest_rate,
      :purchased_on
    )
  end
end