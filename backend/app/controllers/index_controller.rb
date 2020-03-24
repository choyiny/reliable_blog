class IndexController < ApplicationController
  skip_before_action :authenticate_request
  def index
    render json: {
        id: ENV['HOSTNAME'],
        name: 'Reliable Blog Backend',
        version: ENV['APP_VERSION']
    }
  end
end
