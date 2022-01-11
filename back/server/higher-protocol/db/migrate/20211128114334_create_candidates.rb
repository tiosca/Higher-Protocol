class CreateCandidates < ActiveRecord::Migration[6.0]
  def change
    create_table :candidates do |t|
      t.string :personal_details
      t.string :about
      t.string :experiences
      t.string :degree
      t.string :licences
      t.string :hard_skills
      t.string :soft_skills
      t.string :contact_details
      t.references :user, null: false, foreign_key: true
      
      t.timestamps
    end
  end
end
