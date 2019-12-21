class AddPublishedAtToPost < ActiveRecord::Migration[6.0]
  def change
    add_column :posts, :published_at, :datetime
  end
end
