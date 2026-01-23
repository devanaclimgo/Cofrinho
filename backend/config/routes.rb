Rails.application.routes.draw do
  devise_for :users
  namespace :api do
    namespace :v1 do
      get "health", to: "health#index"

      # Transactions routes
      resources :transactions, only: [:index, :create]
    end
  end
end