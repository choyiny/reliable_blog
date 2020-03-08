class QueryLog < ApplicationRecord
  include MongoService

  after_create :push_to_query_store
  after_create :push_to_query_map

  def push_to_query_store
    collection = MongoService::BaseMongoService.connection(ENV[:MONGO_QUERYSTORE_URL])

    collection.insert_one({
        id: self.id,
        time: self.created_at,
        post_ids: Set[self.first_post_id, self.second_post_id, self.third_post_id],
        search_term: self.search_term
    })
  end

  def push_to_query_map
    collection = MongoService::BaseMongoService.connection(ENV[:MONGO_QUERYSTORE_URL])
  end
end
