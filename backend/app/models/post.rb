class Post < ApplicationRecord
  has_many :comments, dependent: :destroy
  has_one :user
end
