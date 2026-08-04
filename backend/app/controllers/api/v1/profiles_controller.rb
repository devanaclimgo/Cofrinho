class Api::V1::ProfilesController < ApplicationController
    before_action :authenticate_user!

  def destroy
    @profile = current_user

    if @profile.destroy
      current_user.destroy
      reset_session
      render json: {
        status: 200,
        message: "Profile and user account deleted successfully"
      }, status: :ok
    else
      redirect_to edit_profile_path, alert: 'Failed to delete profile.'
    end
  end
end
