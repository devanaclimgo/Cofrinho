class Transaction < ApplicationRecord
  belongs_to :user
  belongs_to :card, optional: true
  belongs_to :wallet, optional: true

  has_many :installments, 
           foreign_key: :financial_transaction_id,
           dependent: :destroy

  enum :kind, {
    expense: 0,
    income: 1
  }

  enum :status, {
    completed: 0,
    pending: 1,
    schedules: 2
  }
end