class CreateJobs < ActiveRecord::Migration[6.0]
  def change
    create_table :jobs do |t|
      t.string :job_name
      t.timestamp :post_date
      t.timestamp :expire_date
      t.string :location
      t.string :description
      t.integer :category
      t.string :hash
      t.integer :reward
      t.string :contract_conditions
    end
  end
end
