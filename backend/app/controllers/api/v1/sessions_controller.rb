class Api::V1::SessionsController < Devise::SessionsController
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    render json: {
      status: { code: 200, message: "Login realizado com sucesso" },
      user: resource
    }, status: :ok
  end

  def respond_to_on_destroy
    if current_user
      render json: {
        status: 200,
        message: "Logout realizado com sucesso"
      }, status: :ok
    else
      render json: {
        status: 401,
        message: "Usuário não encontrado"
      }, status: :unauthorized
    end
  end
end