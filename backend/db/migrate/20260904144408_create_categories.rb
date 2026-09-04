class CreateCategories < ActiveRecord::Migration[8.1]
  def change
    create_table :categories do |t|
      t.references :user, null: false, foreign_key: true
      t.string :name, null: false
      t.string :kind, null: false # "income" ou "expense"
      t.timestamps
    end
    add_index :categories, [:user_id, :name, :kind], unique: true
  end
end