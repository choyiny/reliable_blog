class AddFirstNameToUser < ActiveRecord::Migration[6.0]
  def up
    add_column :users, :first_name, :string, null: false
  end

  def down 
    remove_column :users, :first_name, :string
  end
end
