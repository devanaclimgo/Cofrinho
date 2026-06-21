class Transaction < ApplicationRecord
  belongs_to :user
  belongs_to :card, optional: true

  has_many :installments, dependent: :destroy

  enum :kind, {
    expense: 0,
    income: 1
  }
end