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

ActiveRecord::Schema[8.1].define(version: 2026_01_25_205923) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "card_purchases", force: :cascade do |t|
    t.bigint "card_id", null: false
    t.datetime "created_at", null: false
    t.string "description"
    t.integer "installments_count"
    t.decimal "interest_rate"
    t.date "purchased_on"
    t.decimal "total_amount"
    t.datetime "updated_at", null: false
    t.index ["card_id"], name: "index_card_purchases_on_card_id"
  end

  create_table "cards", force: :cascade do |t|
    t.integer "closing_day"
    t.datetime "created_at", null: false
    t.integer "due_day"
    t.decimal "limit"
    t.string "name"
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["user_id"], name: "index_cards_on_user_id"
  end

  create_table "installments", force: :cascade do |t|
    t.decimal "amount"
    t.bigint "card_purchase_id", null: false
    t.datetime "created_at", null: false
    t.date "month"
    t.datetime "updated_at", null: false
    t.index ["card_purchase_id"], name: "index_installments_on_card_purchase_id"
  end

  create_table "transactions", force: :cascade do |t|
    t.decimal "amount"
    t.string "category"
    t.datetime "created_at", null: false
    t.date "occurred_on"
    t.string "transaction_type"
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["user_id"], name: "index_transactions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "auth_token"
    t.datetime "created_at", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.datetime "remember_created_at"
    t.datetime "reset_password_sent_at"
    t.string "reset_password_token"
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "card_purchases", "cards"
  add_foreign_key "cards", "users"
  add_foreign_key "installments", "card_purchases"
  add_foreign_key "transactions", "users"
end
