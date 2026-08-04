class ProfilesController < ApplicationController
  before_action :authenticate_user!

  def destroy
    @profile = current_user.profile

    if @profile.destroy
      current_user.destroy
      reset_session
      redirect_to root_path, notice: 'Profile and user account deleted successfully.'
    else
      redirect_to edit_profile_path, alert: 'Failed to delete profile.'
    end
  end
end
