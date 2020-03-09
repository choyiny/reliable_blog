class QueryLog < ApplicationRecord
  include MongoService

  after_create :push_to_query_store
  after_create :push_to_query_map

  def push_to_query_store
    connection = MongoService::BaseMongoService.new.connection(ENV['MONGO_QUERYSTORE_URL'])
    collection = connection[:querystore]
    collection.insert_one({
        _id: self.id.to_s,
        time: self.created_at,
        post_ids: [self.first_post_id.to_s, self.second_post_id.to_s, self.third_post_id.to_s].reject(&:empty?),
        search_term: self.search_term
    })
  end

  def push_to_query_map
    connection = MongoService::BaseMongoService.new.connection(ENV['MONGO_QUERYMAP_URL'])
    collection = connection[:querymap]
    [self.first_post_id, self.second_post_id, self.third_post_id].each do |post_id|
      unless post_id.nil?
        post_id = post_id.to_s
        collection.update_one(
            {_id: {post_id: post_id.to_s, search_term: self.search_term}, post_id: post_id.to_s, search_term: self.search_term},
            {'$addToSet': {query_ids: self.id.to_s}},
            {upsert: true}
        )
      end
    end

  end
end
