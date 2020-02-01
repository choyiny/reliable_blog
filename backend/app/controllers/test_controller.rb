class TestController < ApplicationController
  skip_before_action :authenticate_request, only: [:error]

  def error
    render nothing: true, status: params[:code].to_i
  end

end
