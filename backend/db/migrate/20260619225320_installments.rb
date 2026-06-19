class Installments < ActiveRecord::Migration[8.1]
  def change
    create_table :installments do |t|

      t.references :transaction

      t.integer :current_installment
      t.integer :total_installments

      t.decimal :amount

      t.date :due_date

      t.timestamps
    end
  end
end
