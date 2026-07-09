class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    render json: {
      status: {
        code: 200,
        message: "Signed up successfully."
      },
      user: resource
    }
  end

  def respond_to_on_destroy
    head :no_content
  end
end