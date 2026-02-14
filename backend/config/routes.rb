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

      # Cards routes
      resources :cards, only: [:index, :create] do
        resources :card_purchases, only: [:create]
      end

      # Purchase validation route
      post "purchase_validations", to: "purchase_validations#validate"

      # Alerts routes
      resources :alerts, only: [:index] do
        member do
          post :mark_as_read
        end
      end

      # User authentication routes
      devise_for :users,
        path: '',
        path_names: {
          sign_in: 'users/sign_in',
          sign_out: 'users/sign_out',
          registration: 'users'
        },
        controllers: {
          sessions: 'api/v1/sessions',
          registrations: 'api/v1/registrations'
        }

      get "me", to: "users#me"
    end
  end
end