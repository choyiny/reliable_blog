class CreateProfiles < ActiveRecord::Migration[6.0]
  def change
    create_table :profiles do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.string :first_name
      t.string :last_name
      t.string :middle_name

      t.timestamps
    end
  end
end
