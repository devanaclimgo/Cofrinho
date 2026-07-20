class Goal < ApplicationRecord
  belongs_to :user
  validates :name, presence: true
  validates :target_amount, numericality: { greater_than: 0 }
end