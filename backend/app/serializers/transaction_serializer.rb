class TransactionSerializer
  include JSONAPI::Serializer

  attributes(
    :id,
    :amount,
    :category,
    :description,
    :kind,
    :wallet_id,
    :transaction_date,
    :icon,
    :status
  )
end