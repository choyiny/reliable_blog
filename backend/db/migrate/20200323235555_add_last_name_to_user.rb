class AddLastNameToUser < ActiveRecord::Migration[6.0]
  def up
    add_column :users, :last_name, :string, null: false
  end

  def down 
    remove_column :users, :last_name, :string
  end
end
