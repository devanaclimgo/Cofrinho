class Api::V1::OnboardingsController < ApplicationController
  before_action :authenticate_user!

  def create
    ActiveRecord::Base.transaction do
      current_user.update!(currency: params[:user][:currency], locale: params[:user][:locale])

      wallet = current_user.wallets.create!(
        name: params[:wallet][:name],
        wallet_type: "checking",
        balance: 0
      )

      if params[:wallet][:balance].to_f > 0
        current_user.transactions.create!(
          wallet: wallet,
          amount: params[:wallet][:balance],
          kind: "income",
          status: "completed",
          category: initial_balance_category(current_user), # ou string "Saldo inicial"
          description: I18n.t("transactions.initial_balance", default: "Saldo inicial"),
          transaction_date: Date.current
        )
      end

      if params[:card].present?
        current_user.wallets.create!(
          name: params[:card][:nickname],
          wallet_type: "credit",
          last4: params[:card][:last4],
          limit: params[:card][:limit],
          balance: 0
        )
      end

      if params[:goal].present?
        current_user.goals.create!(
          name: params[:goal][:name],
          target_amount: params[:goal][:target_amount],
          target_date: params[:goal][:target_date]
        )
      end
    end

    render json: { ok: true }, status: :created
  end

  private

  def initial_balance_category(user)
    user.categories.find_or_create_by!(name: "Saldo inicial", kind: "income")
  end

  def user_params
    params.require(:user).permit(:currency, :locale, :monthly_income)
  end

  def wallet_params
    params.require(:wallet).permit(:name, :balance)
          .merge(wallet_type: "checking", currency:
          current_user.currency)
  end

  def card_params
    params.fetch(:card, {}).permit(:nickname, :last4,:limit)
  end

  def goal_params
    params.fetch(:goal, {}).permit(:name,
    :target_amount, :target_date)
  end
end
