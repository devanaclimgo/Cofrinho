class CreateProfiles < ActiveRecord::Migration[8.1]
  def change
    create_table :profiles do |t|
      t.timestamps
      t.references :user, null: false, foreign_key: true
      t.string :name, null: false
      t.string :email, null: false
    end
  end
end
