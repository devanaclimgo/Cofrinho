Rails.application.routes.draw do
  devise_for :users

  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    namespace :v1 do
      
      resources :transactions
      resources :cards

      get "/dashboard"
      to:"dashboard#index"
      
    end
  end
end
