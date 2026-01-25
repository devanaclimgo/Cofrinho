class CreateCardPurchases < ActiveRecord::Migration[8.1]
  def change
    create_table :card_purchases do |t|
      t.references :card, null: false, foreign_key: true
      t.string :description
      t.decimal :total_amount
      t.integer :installments_count
      t.decimal :interest_rate
      t.date :purchased_on

      t.timestamps
    end
  end
end
