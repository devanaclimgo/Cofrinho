class Installment < ApplicationRecord
  belongs_to :card_purchase

  delegate :card, to: :card_purchase
  delegate :user, to: :card

  validates :amount, :month, presence: true
end