FactoryBot.define do
  factory :user do
    name { Faker::Name.name }

    sequence(:email) do |n|
      "ana#{n}@gmail.com"
    end

    password { "12345678" }
  end
end