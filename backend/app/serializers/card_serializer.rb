class CardSerializer
  include JSONAPI::Serializer

  attributes(
    :id,
    :name,
    :color,
    :limit,
    :closing_day,
    :due_day
  )
end