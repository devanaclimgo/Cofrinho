class CreateGoals < ActiveRecord::Migration[8.1]
  def change
    create_table :goals do |t|
      t.references :user, null: false, foreign_key: true
      t.string :name, null: false
      t.decimal :target_amount, precision: 12, scale: 2, null: false
      t.decimal :current_amount, precision: 12, scale: 2, null: false, default: 0
      t.date :target_date
      t.timestamps
    end
  end
end
