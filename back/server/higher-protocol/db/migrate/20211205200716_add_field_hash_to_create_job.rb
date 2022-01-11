class AddFieldHashToCreateJob < ActiveRecord::Migration[6.0]
  def change
    add_column :job_contracts, :hash_value, :string
  end
end
