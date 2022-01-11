class RenameHashFields < ActiveRecord::Migration[6.0]
  def change
    rename_column :jobs, :hash, :block_hash
  end
end
