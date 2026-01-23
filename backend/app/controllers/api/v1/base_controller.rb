class Api::V1::BaseController < ApplicationController
  before_action :authenticate_user!

  private

  def authenticate_user!
    token = request.headers["Authorization"]&.split(" ")&.last
    @current_user = User.find_by(auth_token: token)

    render json: { error: "Not authorized" }, status: :unauthorized unless @current_user
  end
end