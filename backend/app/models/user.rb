class User < ApplicationRecord
  devise :database_authenticatable,
         :registerable,
         :recoverable,
         :jwt_authenticatable,
         jwt_revocation_strategy: self

  include Devise::JWT::RevocationStrategies::JTIMatcher

  has_many :transactions
  has_many :cards
end