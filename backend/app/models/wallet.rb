class Wallet < ApplicationRecord
  belongs_to :user
  has_many :transactions, dependent: :nullify

  validates :name, presence: true
  validates :wallet_type, inclusion: { in: %w[checking cash savings investment credit] }
end