FactoryBot.define do
  factory :transaction do
    user

    kind { :expense }
    amount { 200 }
    category { "food" }
    description { "Pizza" }
    transaction_date { Date.today }
  end
end