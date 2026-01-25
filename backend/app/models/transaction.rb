class Transaction < ApplicationRecord
  belongs_to :user

  enum transaction_type: {
    income: "income",
    expense: "expense"
  }

  validates :amount, :category, :occurred_on, presence: true

  after_commit :clear_analytics_cache

  def clear_analytics_cache
    Rails.cache.delete_matched("analytics:*:user:#{user_id}:*")
  end
end