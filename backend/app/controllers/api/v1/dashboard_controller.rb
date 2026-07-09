class Api::V1::DashboardController < ApplicationController
  before_action :authenticate_user!

  def index
    data =
      FinancialAnalysis::DashboardService.call(
        current_user
      )
    
    render json: data
  end

end
