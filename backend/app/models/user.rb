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

  has_one :profile, dependent: :destroy

  after_create :seed_default_categories

  DEFAULT_EXPENSE = %w[Food Rent Leisure Health Transport Shopping Bills Other]
  DEFAULT_INCOME = %w[Salary Freelance Investments Refund Gift Other]

  def seed_default_categories
    DEFAULT_EXPENSE.each { |c| categories.create!(name: c, kind: "expense") }
    DEFAULT_INCOME.each { |c| categories.create!(name: c, kind: "income") }
  end
end