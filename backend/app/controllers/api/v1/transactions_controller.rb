class Api::V1::TransactionsController < ApplicationController
  before_action :authenticate_user!

  def index
    transactions = current_user.transactions.order(transaction_date: :desc)

    render json: transactions
  end

  def show
    transaction = current_user.transactions.find(params[:id])

    render json: transaction
  end
end