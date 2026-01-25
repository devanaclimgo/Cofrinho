class CreateInstallments < ActiveRecord::Migration[8.1]
  def change
    create_table :installments do |t|
      t.references :card_purchase, null: false, foreign_key: true
      t.decimal :amount
      t.date :month

      t.timestamps
    end
  end
end
