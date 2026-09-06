class Api::V1::OnboardingsController < ApplicationController
  before_action :authenticate_user!

  def create
    ActiveRecord::Base.transaction do
      current_user.update!(user_params)

      wallet = current_user.wallets.create!(
        wallet_params.merge(wallet_type: "debit", currency: current_user.currency)
      )

      if wallet_params[:balance].to_f > 0
        current_user.transactions.create!(
          wallet: wallet,
          amount: wallet_params[:balance],
          kind: "income",
          status: "completed",
          category: initial_balance_category,
          description: I18n.t("transactions.initial_balance", default: "Saldo inicial"),
          transaction_date: Date.current
        )
      end

      if card_params.present?
        current_user.wallets.create!(
          name: card_params[:nickname],
          wallet_type: "credit",
          last4: card_params[:last4],
          limit: card_params[:limit],
          balance: 0,
          currency: current_user.currency
        )
      end

      if goal_params.present?
        current_user.goals.create!(goal_params)
      end
    end

    render json: { ok: true }, status: :created
  end

  private

  def initial_balance_category
    current_user.categories.find_or_create_by!(name: "Saldo inicial", kind: "income")
  end

  def user_params
    params.require(:user).permit(:currency, :locale, :monthly_income)
  end

  def wallet_params
    params.require(:wallet).permit(:name, :balance)
  end

  def card_params
    params.fetch(:card, {}).permit(:nickname, :last4, :limit)
  end

  def goal_params
    params.fetch(:goal, {}).permit(:name, :target_amount, :target_date)
  end
end