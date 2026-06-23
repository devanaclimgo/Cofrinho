FactoryBot.define do
  factory :jwt_denylist do
    jti { "MyString" }
    exp { "2026-06-23 16:58:08" }
  end
end
