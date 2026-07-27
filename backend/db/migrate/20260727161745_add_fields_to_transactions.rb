class AddFieldsToTransactions < ActiveRecord::Migration[8.1]
  def change
    add_reference :transactions, :wallet, null: false, foreign_key: true
    add_column :transactions, :status, :integer
    add_column :transactions, :icon, :string
  end
end
