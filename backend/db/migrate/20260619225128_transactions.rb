class Transactions < ActiveRecord::Migration[8.1]
  def change
    create_table :transactions do |t|

      t.references :user, null:false
      t.references :card

      t.integer :kind
      t.decimal :amount, precision: 10, scale: 2

      t.string :category
      t.string :description

      t.date :transaction_date

      t.timestamps
    end
  end
end
