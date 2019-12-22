class AuthenticationController < ApplicationController
  skip_before_action :authenticate_request

  def authenticate
    command = AuthenticateUser.call params[:email], params[:password]

    if command.success?
      render json: {auth_token: command.result}
    else
      render json: {error: command.errors}, status: :unautorized
    end
  end

  def register
    email, password = params.require([:email, :password])
    if User.where(email: email).size > 0
      return render json: {status: 'failed', message: 'user exists'}
    end
    User.create({email: email, password: password})
    render json: {status: 'success'}
  end
end