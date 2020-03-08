class QueryLog < ApplicationRecord
  include MongoService

  after_create :push_to_query_store
  after_create :push_to_query_map

  def push_to_query_store
    connection = MongoService::BaseMongoService.new.connection(ENV['MONGO_QUERYSTORE_URL'])
    collection = connection[:asdf]
    collection.insert_one({
        id: self.id,
        time: self.created_at,
        post_ids: Set[self.first_post_id, self.second_post_id, self.third_post_id],
        search_term: self.search_term
    })
  end

  def push_to_query_map
    connection = MongoService::BaseMongoService.new.connection(ENV['MONGO_QUERYMAP_URL'])
    collection = connection[:asdf]
    [self.first_post_id, self.second_post_id, self.third_post_id].each do |post_id|
      unless post_id.nil?
        collection.update_one(
            {post_id: post_id, search_term: self.search_term},
            {'$addToSet': {query_ids: self.id}},
            {upsert: true}
        )
      end
    end

  end
end
