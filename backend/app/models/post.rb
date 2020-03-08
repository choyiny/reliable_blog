class Post < ApplicationRecord
  include PgSearch::Model

  pg_search_scope :search_by_query, against: [
      [:title, 'A'],
      [:content, 'B']
  ]

  enum status: [:unpublished, :published]
  has_many :comments, dependent: :destroy
  belongs_to :user

  default_scope { order(created_at: :desc) }

  def self.published_in_the_future
    where(published_at: DateTime.now..DateTime::Infinity.new)
  end
end
