class Api::V1::TransactionsController < ApplicationController
  before_action :authenticate_user!

  def index
    transactions = current_user.transactions.order(transaction_date: :desc)

    render json: TransactionSerializer.new(transactions)
  end

  def show
    transaction = current_user.transactions.find(params[:id])

    render json: TransactionSerializer.new(transaction)
  end
end