class PurchaseSimulator < ActiveRecord::Migration[8.1]
  def change
        create_table :purchase_simulations do |t|

      t.references :user

      t.string :item_name

      t.decimal :total_price

      t.integer :installments

      t.timestamps
    end
  end
end
