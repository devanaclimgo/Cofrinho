class Api::V1::TransactionsController < ApplicationController

  def show
    transaction = Transaction.find(params[:id])

    authorize transaction

    render json: transaction
  end

end