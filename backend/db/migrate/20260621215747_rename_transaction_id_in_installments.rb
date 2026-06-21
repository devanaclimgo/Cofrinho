class RenameTransactionIdInInstallments < ActiveRecord::Migration[8.0]
  def change
    rename_column :installments,
                  :transaction_id,
                  :financial_transaction_id
  end
end