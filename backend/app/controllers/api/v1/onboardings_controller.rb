class Api::V1::OnboardingsController < ApplicationController
  class OnboardingsController < ApplicationController
    before_action :authenticate_user!

    def create
      ActiveRecord::Base.transaction do
        current_user.update!(user_params)
        current_user.wallets.create!(wallet_params)

        if card_params[:nickname].present?
          current_user.wallets.create!(
            name: card_params[:nickname],
            wallet_type: "credit",
            last4: card_params[:last4],
            credit_limit: card_params[:limit],
            currency: current_user.currency
          )
        end

        current_user.goals.create!(goal_params) if goal_params[:name].present?
        current_user.update!(onboarding_completed: true)
      end

      render json: current_user.as_json(
        only: [:id, :name, :email, :currency, :locale, :onboarding_completed]
      ), status: :ok
    rescue ActiveRecord::RecordInvalid => e
      render json: { error: e.message }, status: :unprocessable_entity
    end

    private

    def user_params
      params.require(:user).permit(:currency, :locale, :monthly_income)
    end

    def wallet_params
      params.require(:wallet).permit(:name, :balance)
        .merge(wallet_type: "checking", currency: current_user.currency)
    end

    def card_params
      params.fetch(:card, {}).permit(:nickname, :last4, :limit)
    end

    def goal_params
      params.fetch(:goal, {}).permit(:name, :target_amount, :target_date)
    end
  end
end
