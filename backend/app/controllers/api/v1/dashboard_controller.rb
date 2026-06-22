class Api::V1::DashboardController < ApplicationController

  def index
    data =
      FinancialAnalysis::DashboardService.call(
        current_user
      )
    
    render json: data
  end

end
