# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_07_27_161745) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "cards", force: :cascade do |t|
    t.integer "closing_day"
    t.string "color"
    t.datetime "created_at", null: false
    t.integer "due_day"
    t.decimal "limit"
    t.string "name"
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["user_id"], name: "index_cards_on_user_id"
  end

  create_table "goals", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.decimal "current_amount", precision: 12, scale: 2, default: "0.0", null: false
    t.string "name", null: false
    t.decimal "target_amount", precision: 12, scale: 2, null: false
    t.date "target_date"
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["user_id"], name: "index_goals_on_user_id"
  end

  create_table "installments", force: :cascade do |t|
    t.decimal "amount"
    t.datetime "created_at", null: false
    t.integer "current_installment"
    t.date "due_date"
    t.bigint "financial_transaction_id"
    t.integer "total_installments"
    t.datetime "updated_at", null: false
    t.index ["financial_transaction_id"], name: "index_installments_on_financial_transaction_id"
  end

  create_table "jwt_denylists", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "exp"
    t.string "jti"
    t.datetime "updated_at", null: false
    t.index ["jti"], name: "index_jwt_denylists_on_jti"
  end

  create_table "purchase_simulations", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.integer "installments"
    t.string "item_name"
    t.decimal "total_price"
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["user_id"], name: "index_purchase_simulations_on_user_id"
  end

  create_table "transactions", force: :cascade do |t|
    t.decimal "amount", precision: 10, scale: 2
    t.bigint "card_id"
    t.string "category"
    t.datetime "created_at", null: false
    t.string "description"
    t.string "icon"
    t.integer "kind"
    t.integer "status"
    t.date "transaction_date"
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.bigint "wallet_id", null: false
    t.index ["card_id"], name: "index_transactions_on_card_id"
    t.index ["user_id"], name: "index_transactions_on_user_id"
    t.index ["wallet_id"], name: "index_transactions_on_wallet_id"
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "currency", default: "BRL"
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "jti", null: false
    t.string "locale", default: "pt"
    t.decimal "monthly_income", precision: 12, scale: 2
    t.string "name"
    t.boolean "onboarding_completed", default: false, null: false
    t.datetime "remember_created_at"
    t.datetime "reset_password_sent_at"
    t.string "reset_password_token"
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["jti"], name: "index_users_on_jti", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "wallets", force: :cascade do |t|
    t.decimal "balance", precision: 12, scale: 2, default: "0.0", null: false
    t.string "color", default: "#6366f1"
    t.datetime "created_at", null: false
    t.decimal "credit_limit", precision: 12, scale: 2
    t.string "currency", default: "BRL", null: false
    t.string "last4"
    t.string "name", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.string "wallet_type", default: "checking", null: false
    t.index ["user_id"], name: "index_wallets_on_user_id"
  end

  add_foreign_key "goals", "users"
  add_foreign_key "transactions", "wallets"
  add_foreign_key "wallets", "users"
end
