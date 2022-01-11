class CreateJobContracts < ActiveRecord::Migration[6.0]
  def change
    create_table :job_contracts do |t|
      t.string :condition
      t.string :value
      t.string :min_points
      t.string :task
      t.string :description

      t.timestamps

      t.references :job, null: false, foreign_key: true
    end
  end
end