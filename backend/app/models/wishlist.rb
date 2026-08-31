class Wishlist < ApplicationRecord
  belongs_to :user

  validates :name, :price, :desired_date, presence: true
  validates :price, numericality: { greater_than: 0 }
  validates :verdict, inclusion: { in: %w[buy wait no] }, allow_nil: true
end