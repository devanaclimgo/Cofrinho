class Wishlist < ApplicationRecord
  belongs_to :user

  validates :name, :price, :desired_date, presence: true
  validates :price, numericality: { greater_than: 0 }
  validates :priority, inclusion: { in: %w[high medium low] }, allow_nil: true
end