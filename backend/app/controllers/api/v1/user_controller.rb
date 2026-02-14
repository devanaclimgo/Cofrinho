# controller
class Api::V1::UsersController < Api::V1::BaseController
  before_action :authenticate_user!

  def me
    render json: current_user
  end
end
