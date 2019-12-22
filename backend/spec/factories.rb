FactoryBot.define do
  factory :post, class: Post do
    title { Faker::Lorem.sentence }
    content { Faker::Lorem.paragraph }
    user


    trait :has_comments do
      after(:build) do |post|
        post.comments << FactoryBot.build_list(:comment, 3)
      end
    end

    trait :published do
      status { :published }
    end

    trait :in_the_past do
      published_at { 2.days.ago }
    end

    trait :in_the_future do
      published_at { 2.days.from_now }
    end
  end

  factory :user, class: User do
    email { Faker::Internet.email }
    password { Faker::Internet.password }
  end
  
  factory :comment, class: Comment do
    content { Faker::Lorem.paragraph }
    user
    post
  end
end