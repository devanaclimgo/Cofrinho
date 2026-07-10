class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  protected

  def sign_up(resource_name, resource)
  end

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

  before_action :configure_sign_up_params, only: [:create]

  protected

  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username])
  end
end