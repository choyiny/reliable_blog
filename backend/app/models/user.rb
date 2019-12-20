class User < ApplicationRecord
  has_secure_password
  has_one :profile, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :posts, dependent: :destroy
end
