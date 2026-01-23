class Transaction < ApplicationRecord
  belongs_to :user

  enum transaction_type: {
    income: "income",
    expense: "expense"
  }

  validates :amount, :category, :occurred_on, presence: true
end