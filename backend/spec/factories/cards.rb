FactoryBot.define do
  factory :card do
    user

    name { "Nubank" }
    color { "purple" }
    limit { 3000 }
    closing_day { 20 }
    due_day { 27 }
  end
end