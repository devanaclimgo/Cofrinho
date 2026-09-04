class Api::V1::WalletsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_wallet, only: [:show, :update, :destroy]

  def index
    wallets = current_user.wallets.order(created_at: :desc)
    render json: wallets
  end

  def show
    render json: @wallet
  end

  def create
    wallet = current_user.wallets.build(wallet_params)

    if wallet.save
      render json: wallet, status: :created
    else
      render json: { errors: wallet.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @wallet.update(wallet_params)
      render json: @wallet
    else
      render json: { errors: @wallet.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @wallet.destroy
    head :no_content
  end

  private

  def set_wallet
    @wallet = current_user.wallets.find(params[:id])
  end

  def wallet_params
    params.require(:wallet).permit(
      :name, :wallet_type, :balance, :limit, :last4, :color
    )
  end
end