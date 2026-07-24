class Api::V1::UsersController < ApplicationController
  before_action :authenticate_user!

  def me
    render json: current_user.as_json(
      only: [
        :id,
        :name,
        :email,
        :currency,
        :locale,
        :onboarding_completed
      ]
    )
  end
end