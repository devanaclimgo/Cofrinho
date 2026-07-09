class Api::V1::TransactionsController < ApplicationController
  before_action :authenticate_user!

  def show
    transaction = Transaction.find(params[:id])

    authorize transaction

    render json: TransactionSerializer.new(transaction)
  end

end