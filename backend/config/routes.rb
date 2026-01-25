Rails.application.routes.draw do
  devise_for :users
  namespace :api do
    namespace :v1 do
      get "health", to: "health#index"

      # Transactions routes
      resources :transactions, only: [:index, :create]

      # Analytics routes
      resources :analytics, only: [] do
        collection do
          get :weekly
          get :monthly
          get :yearly
          get :by_category
        end
      end

      get "analytics/month_comparison", to: "analytics#month_comparison"

      get "analytics/daily_budget", to: "analytics#daily_budget"
    end
  end
end