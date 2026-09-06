class Category < ApplicationRecord
  belongs_to :user
  has_many :transactions, dependent: :nullify

  validates :name, presence: true
  validates :kind, inclusion: { in: %w[income expense] }
  validates :name, uniqueness: { scope: [:user_id, :kind] }
end