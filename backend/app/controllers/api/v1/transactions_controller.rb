class Api::V1::TransactionsController < Api::V1::BaseController
  def index
    transactions = @current_user.transactions.order(occurred_on: :desc)
    render json: transactions
  end

  def create
    transaction = @current_user.transactions.new(transaction_params)

    if transaction.save
      render json: transaction, status: :created
    else
      render json: { errors: transaction.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def transaction_params
    params.require(:transaction).permit(
      :transaction_type,
      :amount,
      :category,
      :occurred_on
    )
  end
end