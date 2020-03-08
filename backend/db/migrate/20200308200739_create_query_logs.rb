class CreateQueryLogs < ActiveRecord::Migration[6.0]
  def change
    create_table :query_logs do |t|
      t.string :first_post_id, null: true
      t.string :second_post_id, null: true
      t.string :third_post_id, null: true
      t.string :search_term, null: false

      t.timestamps
    end
  end
end
