class Users::SessionsController < Devise::SessionsController
  respond_to :json

  private

  def respond_with(current_user, _opts = {})
    render json: {
      status: {
        code: 200,
        message: "Logged in successfully."
      },
      user: current_user
    }
  end

  def respond_to_on_destroy
    render json: {
      status: 200,
      message: "Logged out successfully."
    }
  end
end