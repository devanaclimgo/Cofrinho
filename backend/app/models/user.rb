class User < ApplicationRecord
  devise :database_authenticatable,
         :registerable,
         :recoverable,
         :jwt_authenticatable,
         jwt_revocation_strategy: self

  include Devise::JWT::RevocationStrategies::JTIMatcher

  has_many :transactions, dependent: :destroy
  has_many :cards, dependent: :destroy
  belongs_to :user, optional: true
end