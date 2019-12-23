class Post < ApplicationRecord
  enum status: [:unpublished, :published]
  has_many :comments, dependent: :destroy
  belongs_to :user

  default_scope { order(created_at: :desc) }

  def self.published_in_the_future
    where(published_at: DateTime.now..DateTime::Infinity.new)
  end
end
