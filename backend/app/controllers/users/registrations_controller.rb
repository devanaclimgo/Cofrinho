class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    if resource.persisted?
      render json: {
        message: "User created successfully"
      }, status: :created
    else
      render json: {
        errors: resource.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def respond_to_on_destroy
    if current_user.nil?
      render json: {
        status: 200,
        message: "Account deleted successfully"
      }, status: :ok
    else
      render json: {
        status: 400,
        message: "Failed to delete account"
      }, status: :unprocessable_entity
    end
  end

  before_action :configure_sign_up_params, only: [:create]

  protected

  def configure_sign_up_params
    devise_parameter_sanitizer.permit(
      :sign_up,
      keys: [:name]
    )
  end
end