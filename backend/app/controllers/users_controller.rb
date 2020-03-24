class UsersController < ApplicationController
  skip_before_action :authenticate_request

  def index
    render json: User.all
  end

  def show
    @user = User.find(params[:id])
    render plain: 'Hi my name is ' + @user.first_name + ' ' + @user.last_name
  end
end
