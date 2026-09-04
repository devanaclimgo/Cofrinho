class Category < ApplicationRecord
  belongs_to :user
  validates :name, presence: true
  validates :kind, inclusion: { in: %w[income expense] }
end