class Card < ApplicationRecord
  belongs_to :user

  has_many :card_purchases, dependent: :destroy

  validates :name, :limit, :closing_day, :due_day, presence: true
end
