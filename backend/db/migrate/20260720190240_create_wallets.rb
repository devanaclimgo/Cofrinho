class CreateWallets < ActiveRecord::Migration[8.1]
  def change
    create_table :wallets do |t|
      t.references :user, null: false, foreign_key: true
      t.string :name, null: false
      t.string :wallet_type, null: false, default: "checking" # checking, cash, savings, investment, credit
      t.decimal :balance, precision: 12, scale: 2, null: false, default: 0
      t.string :color, default: "#6366f1"
      t.string :last4
      t.decimal :credit_limit, precision: 12, scale: 2
      t.string :currency, null: false, default: "BRL"
      t.timestamps
    end
  end
end
