class AddOnboaringFieldsToUsers < ActiveRecord::Migration[8.1]
  def change
    add_column :users, :currency, :string, default: "BRL"
    add_column :users, :locale, :string, default: "pt"
    add_column :users, :monthly_income, :decimal, precision: 12, scale: 2
    add_column :users, :onboarding_completed, :boolean, default: false, null: false
  end
end
