class User < ApplicationRecord
  devise :database_authenticatable,
         :registerable,
         :recoverable,
         :rememberable,
         :validatable,
         :jwt_authenticatable,
         jwt_revocation_strategy: self

  include Devise::JWT::RevocationStrategies::JTIMatcher

  has_many :transactions, dependent: :destroy
  has_many :cards, dependent: :destroy
  has_many :wallets, dependent: :destroy
  has_many :goals, dependent: :destroy
  has_many :wishlists, dependent: :destroy

  has_one :profile, dependent: :destroy
end