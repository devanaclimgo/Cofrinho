class CreateWishlists < ActiveRecord::Migration[8.1]
  def change
    create_table :wishlists do |t|
      t.references :user, null: false, foreign_key: true
      t.string :name, null: false
      t.string :store
      t.decimal :price, precision: 12, scale: 2, null: false
      t.string :image
      t.date :desired_date
      t.string :priority

      t.timestamps
    end

    add_index :wishlists, [:user_id, :created_at]
  end
end