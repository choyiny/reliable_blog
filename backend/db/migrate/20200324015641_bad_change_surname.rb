class BadChangeSurname < ActiveRecord::Migration[6.0]
  def up
    rename_column :users, :last_name, :surname

  end

  def down 
    rename_column :users, :surname, :last_name
  end
end
