class TransactionSerializer < ActiveModel::Serializer
  attributes :id, :description, :category, :category_id, :wallet_id, :amount, :kind, :status, :transaction_date

  def category
    object.category&.name
  end
end