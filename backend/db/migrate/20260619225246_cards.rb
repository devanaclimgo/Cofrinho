class Cards < ActiveRecord::Migration[8.1]
  def change
    create_table :cards do |t|

      t.references :user

      t.string :name
      t.string :color
      t.decimal :limit

      t.integer :closing_day
      t.integer :due_day

      t.timestamps
    end
  end
end
