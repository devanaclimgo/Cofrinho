class Api::V1::WishlistsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_wishlist, only: [:show, :update, :destroy]

  def index
    wishlists = current_user.wishlists.order(created_at: :desc)

    render json: wishlists
  end

  def show
    render json: @wishlist
  end

  def create
    wishlist = current_user.wishlists.build(wishlist_params)

    if wishlist.save
      render json: wishlist, status: :created
    else
      render json: {
        errors: wishlist.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def update
    if @wishlist.update(wishlist_params)
      render json: @wishlist
    else
      render json: {
        errors: @wishlist.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def destroy
    @wishlist.destroy

    head :no_content
  end

  private

  def set_wishlist
    @wishlist = current_user.wishlists.find(params[:id])
  end

  def wishlist_params
    params.require(:wishlist).permit(
      :name,
      :store,
      :price,
      :image,
      :desired_date,
      :verdict
    )
  end
end