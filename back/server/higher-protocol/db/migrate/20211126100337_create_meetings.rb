class CreateMeetings < ActiveRecord::Migration[6.0]
  def change
    create_table :meetings do |t|
      t.timestamp :start_time
      t.string :name
      t.integer :category

      t.timestamps
    end
  end
end
