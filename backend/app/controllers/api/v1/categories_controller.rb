class Api::V1::CategoriesController < ApplicationController
  before_action :authenticate_user!

  def index
    categories = current_user.categories.order(:name)
    categories = categories.where(kind: params[:kind]) if params[:kind].present?
    render json: categories
  end

  def create
    category = current_user.categories.build(category_params)
    if category.save
      render json: category, status: :created
    else
      render json: { errors: category.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    current_user.categories.find(params[:id]).destroy
    head :no_content
  end

  private

  def category_params
    params.require(:category).permit(:name, :kind)
  end
end