Rails.application.routes.draw do
  devise_for :users
  namespace :api do
    namespace :v1 do
      get "health", to: "health#index"

      # Transactions routes
      resources :transactions, only: [:index, :create]

      # Analytics routes
      get "analytics/monthly", to: "analytics#monthly"
    end
  end
end