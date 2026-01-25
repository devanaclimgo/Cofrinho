class Api::V1::AnalyticsController < Api::V1::BaseController
  def weekly
    data = Analytics::WeeklyService.new(
      user: @current_user,
      transaction_type: params[:type]
    ).call

    render json: data
  end

  def monthly
    data = Analytics::MonthlyService.new(
      user: @current_user,
      month: params[:month].to_i,
      year: params[:year].to_i,
      transaction_type: params[:type]
    ).call

    render json: data
  end

  def yearly
    data = Analytics::YearlyService.new(
      user: @current_user,
      year: params[:year].to_i,
      transaction_type: params[:type]
    ).call

    render json: data
  end

  def by_category
    data = Analytics::ByCategoryService.new(
      user: @current_user,
      transaction_type: params[:type],
      start_date: params[:start_date],
      end_date: params[:end_date]
    ).call

    render json: data
  end

  def month_comparison
    data = Analytics::MonthComparisonService.new(
      user: @current_user,
      transaction_type: params[:type]
    ).call

    render json: data
  end
end