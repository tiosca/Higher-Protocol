class CreateCvDocuments < ActiveRecord::Migration[6.0]
  def change
    create_table :cv_documents do |t|
      t.string :version
      t.string :pdf_link
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
