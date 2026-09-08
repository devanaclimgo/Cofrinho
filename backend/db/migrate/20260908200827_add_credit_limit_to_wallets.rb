class AddCreditLimitToWallets < ActiveRecord::Migration[8.1]
  def change
    add_column :wallets, :credit_limit, :decimal, precision: 12, scale: 2
  end
end