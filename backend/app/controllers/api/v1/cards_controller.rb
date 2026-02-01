class Api::V1::CardsController < Api::V1::BaseController
  def index
    render json: @current_user.cards
  end

  def create
    card = @current_user.cards.new(card_params)

    if card.save
      render json: card, status: :created
    else
      render json: { errors: card.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def card_params
    params.require(:card).permit(:name, :limit, :closing_day, :due_day)
  end
end