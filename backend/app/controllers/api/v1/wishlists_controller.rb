class Api::V1::WishlistsController < ApplicationController
  before_action :authenticate_user!

  def index
    wishlists = current_user.wishlists.order(created_at: :desc)

    render json: wishlists
  end

  def create
    wishlist = current_user.wishlists.new(wishlist_params)

    if wishlist.save
      render json: wishlist, status: :created
    else
      render json: { errors: wishlist.errors.full_messages },
             status: :unprocessable_entity
    end
  end

  def show
    wishlist = current_user.wishlists.find(params[:id])

    render json: wishlist
  end

  def update
    wishlist = current_user.wishlists.find(params[:id])

    if wishlist.update(wishlist_params)
      render json: wishlist
    else
      render json: { errors: wishlist.errors.full_messages },
             status: :unprocessable_entity
    end
  end

  def destroy
    wishlist = current_user.wishlists.find(params[:id])

    wishlist.destroy

    head :no_content
  end

  private

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