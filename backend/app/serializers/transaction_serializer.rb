class TransactionSerializer
  include JSONAPI::Serializer

  attributes(
    :id,
    :amount,
    :category,
    :description,
    :kind,
    :transaction_date
  )
end