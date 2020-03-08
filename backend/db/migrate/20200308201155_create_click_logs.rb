class CreateClickLogs < ActiveRecord::Migration[6.0]
  def change
    create_table :click_logs do |t|
      t.references :post, null: false
      t.string :query_id, null: false

      t.timestamps
    end
  end
end
