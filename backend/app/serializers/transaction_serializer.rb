class TransactionSerializer < ActiveModel::Serializer
  attributes :id, :title, :category, :wallet, :amount, :type, :date

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