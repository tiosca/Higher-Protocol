# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_12_05_200716) do

  create_table "candidates", force: :cascade do |t|
    t.string "personal_details"
    t.string "about"
    t.string "experiences"
    t.string "degree"
    t.string "licences"
    t.string "hard_skills"
    t.string "soft_skills"
    t.string "contact_details"
    t.integer "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "position"
    t.datetime "starting_date"
    t.string "location"
    t.boolean "is_remote"
    t.integer "match_score"
    t.index ["user_id"], name: "index_candidates_on_user_id"
  end

  create_table "cv_documents", force: :cascade do |t|
    t.string "version"
    t.string "pdf_link"
    t.integer "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_cv_documents_on_user_id"
  end

  create_table "job_contracts", force: :cascade do |t|
    t.string "condition"
    t.string "value"
    t.string "min_points"
    t.string "task"
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "job_id", null: false
    t.string "hash_value"
    t.index ["job_id"], name: "index_job_contracts_on_job_id"
  end

  create_table "jobs", force: :cascade do |t|
    t.string "job_name"
    t.datetime "post_date"
    t.datetime "expire_date"
    t.string "location"
    t.string "description"
    t.integer "category"
    t.string "block_hash"
    t.integer "reward"
    t.string "contract_conditions"
  end

  create_table "jwt_denylist", force: :cascade do |t|
    t.string "jti", null: false
    t.datetime "exp", null: false
    t.index ["jti"], name: "index_jwt_denylist_on_jti"
  end

  create_table "meetings", force: :cascade do |t|
    t.datetime "start_time"
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "category"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "first_name"
    t.string "last_name"
    t.integer "category"
    t.string "image"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "candidates", "users"
  add_foreign_key "cv_documents", "users"
  add_foreign_key "job_contracts", "jobs"
end
