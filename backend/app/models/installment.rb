class Installment < ApplicationRecord
  belongs_to :financial_transaction, 
             class_name: "Transaction"
end