class TransactionSerializer < ActiveModel::Serializer

  attributes(
    :id,
    :amount,
    :category,
    :description,
    :kind,
    :wallet_id,
    :transaction_date,
    :status,
    :icon
  )

  def icon
    case object.category
    when "food" then "shopping-cart"
    when "transport" then "car"
    when "salary" then "briefcase"
    else "circle"
    end
  end
end