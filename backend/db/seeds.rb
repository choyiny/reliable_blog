# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# User.create(username: 'choyiny', email: 'choyiny@deployingreliable.software', password: 'temppass')
# User.create(username: 'jordan.liu', email: 'jordan.liu@deployingreliable.software', password: 'temppass')


# we want to seed initial query and click logs
# click logs are around 10% of queries.
10.times do |index|
  query_log = QueryLog.create!(first_post_id: rand(1..10), second_post_id: rand(11..20), third_post_id: rand(21..30), search_term: rand(1..100))
  # do click logs every 10 times
  if index % 10 == 0
    a = [query_log.first_post_id, query_log.second_post_id, query_log.third_post_id]
    ClickLog.create!(query_id: query_log.id, post_id: a.sample)
  end
end