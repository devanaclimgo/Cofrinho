class Api::V1::TransactionsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_transaction, only: [:show, :update, :destroy]

  def index
    transactions = current_user.transactions.order(transaction_date: :desc)
    render json: transactions
  end

  def show
    render json: @transaction
  end

  def create
    transaction = current_user.transactions.build(transaction_params)

    if transaction.save
      render json: transaction, status: :created
    else
      render json: { errors: transaction.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @transaction.update(transaction_params)
      render json: @transaction
    else
      render json: { errors: @transaction.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @transaction.destroy
    head :no_content
  end

  private

  def set_transaction
    @transaction = current_user.transactions.find(params[:id])
  end

  def transaction_params
    params.require(:transaction).permit(
      :amount, :description, :category, :kind, :status,
      :transaction_date, :wallet_id, :card_id
    )
  end
end