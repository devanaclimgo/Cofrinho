class User < ApplicationRecord
  devise :database_authenticatable,
         :registerable,
         :recoverable,
         :rememberable,
         :validatable,
         :jwt_authenticatable,
         jwt_revocation_strategy: self

  include Devise::JWT::RevocationStrategies::JTIMatcher

  has_many :transactions, dependent: :destroy
  has_many :cards, dependent: :destroy
  has_many :wallets, dependent: :destroy
  has_many :goals, dependent: :destroy
  has_many :wishlists, dependent: :destroy
  has_many :categories, dependent: :destroy

  after_create :seed_default_categories

  DEFAULT_EXPENSE_CATEGORIES = %w[Food Rent Leisure Health Transport Shopping Bills Other]
  DEFAULT_INCOME_CATEGORIES = %w[Salary Freelance Investments Refund Gift Other]

  private

  def seed_default_categories
    DEFAULT_EXPENSE_CATEGORIES.each { |name| categories.create!(name: name, kind: "expense") }
    DEFAULT_INCOME_CATEGORIES.each { |name| categories.create!(name: name, kind: "income") }
  end
end