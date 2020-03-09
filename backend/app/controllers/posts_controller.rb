class PostsController < ApplicationController
  before_action :set_posts, only: :index
  before_action :set_post, only: [:show, :update, :destroy]
  skip_before_action :authenticate_request, only: [:index, :show]

  after_action :store_click_log, only: [:show]
  before_action :store_query_log, only: [:index]

  # GET /posts
  def index
    render json: {posts: @posts, query_id: @query_log&.id}
  end

  # GET /posts/1
  def show
    render json: @post
  end

  # POST /posts
  def create
    @post = Post.new(post_params)

    @post.user = @current_user

    if @post.save
      render json: @post, status: :created, location: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  def update
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1
  def destroy
    @post.destroy
  end

  private

  def set_posts
    if params[:query].blank?
      @posts = Post.all
    else
      @posts = Post.search_by_query(params[:query]).limit(3)
    end

    @posts = @posts.select(:id, :title, :user_id)
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_post
    @post = Post.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def post_params
    params.require(:post).permit(:title, :content)
  end

  def store_query_log
    unless params[:query].blank?
      @query_log = QueryLog.create(search_term: params[:query],
                      first_post_id: @posts[0]&.id,
                      second_post_id: @posts[1]&.id,
                      third_post_id: @posts[2]&.id)
    end
  end

  def store_click_log
    unless params[:query_id].blank?
      ClickLog.create(post_id: @post.id, query_id: params[:query_id])
    end
  end

end
