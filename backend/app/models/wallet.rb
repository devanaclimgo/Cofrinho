class Wallet < ApplicationRecord
  belongs_to :user
  has_many :transactions, dependent: :nullify

  validates :name, presence: true
  validates :wallet_type, inclusion: { in: %w[debit cash savings investment credit limit] }
end