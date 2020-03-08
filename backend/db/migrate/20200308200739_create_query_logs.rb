class CreateQueryLogs < ActiveRecord::Migration[6.0]
  def change
    create_table :query_logs do |t|
      t.references :first_post, null: true, foreign_key: {to_table: :posts}
      t.references :second_post, null: true, foreign_key: {to_table: :posts}
      t.references :third_post, null: true, foreign_key: {to_table: :posts}
      t.string :search_term, null: false

      t.timestamps
    end
  end
end
