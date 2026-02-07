class Api::V1::AlertsController < Api::V1::BaseController
  def index
    render json: @current_user.alerts.unread
  end

  def mark_as_read
    alert = @current_user.alerts.find(params[:id])
    alert.update(read: true)

    render json: alert
  end
end