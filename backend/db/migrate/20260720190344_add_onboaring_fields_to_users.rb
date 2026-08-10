class AddOnboardingFieldsToUsers < ActiveRecord::Migration[8.1]
  def change
    add_column :users, :currency, :string, default: "BRL", null: false
    add_column :users, :locale, :string, default: "pt", null: false
    add_column :users, :monthly_income, :decimal, precision: 12, scale: 2, default: 0
  end
end