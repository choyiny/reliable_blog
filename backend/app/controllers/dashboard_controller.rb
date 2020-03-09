class DashboardController < ApplicationController
  include MongoService
  skip_before_action :authenticate_request

  def get
    if params[:search_term].blank? || params[:post_id].blank?
      render json: {success: false}, status: 422
    end
    connection = MongoService::BaseMongoService.new.connection(ENV['MONGO_QUERYMAP_URL'])
    querymap = connection[:querymap]

    queries = querymap.find({post_id: params[:post_id], search_term: params[:search_term]}).first&.fetch 'query_ids'
    num_queries = queries.length

    clickmap = connection[:clickmap]

    clicks = clickmap.find({post_id: params[:post_id], search_term: params[:search_term]}).first&.fetch 'query_ids'
    num_clicks = clicks.length

    render json: {
        clicks: num_clicks,
        queries: num_queries,
        ctr: num_clicks / num_queries * 100
    }

  end
end
