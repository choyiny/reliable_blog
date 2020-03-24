class GoodMigrationP1 < ActiveRecord::Migration[6.0]
  def up
    add_column :users, :surname, :string
    User.all.each do |u|
      u.update_attributes(surname: u.last_name)
    end
  end

  def down
    remove_column :users, :surname, :string
  end
end
