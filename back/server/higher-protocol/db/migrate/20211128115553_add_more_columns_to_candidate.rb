class AddMoreColumnsToCandidate < ActiveRecord::Migration[6.0]
  def change
    add_column :candidates, :position, :string
    add_column :candidates, :starting_date, :timestamp
    add_column :candidates, :location, :string
    add_column :candidates, :is_remote, :boolean
    add_column :candidates, :match_score, :integer
  end
end
