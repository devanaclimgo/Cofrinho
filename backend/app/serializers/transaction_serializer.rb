class TransactionSerializer < ActiveModel::Serializer
    attributes :id, :description, :category, :wallet_id, :card_id, :amount, :kind, :status, :transaction_date

  def title
    object.description
  end

  def wallet
    object.wallet&.name
  end

  def type
    object.kind
  end

  def date
    object.transaction_date
  end
end