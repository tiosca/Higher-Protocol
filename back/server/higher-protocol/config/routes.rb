Rails.application.routes.draw do
  devise_for :users, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'register'
  },
  controllers: {
    sessions: 'session/sessions',
    registrations: 'session/registrations'
  }

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  # resources :users
  resources :stats
  resources :jobs
  resources :candidates

  
  # Events
  get "calendar", to: "stats#meetings"
  post "calendar", to: "stats#create_meeting"
  delete "calendar/:id", to: "stats#delete_meeting"

  # Users
  get "/profile", to: "users#my_profile"
  get "/all_users", to: "users#index"

  # Jobs smart contracts
  get "jobs/:id/contract", to: "jobs_contracts#show_contract"
  post "jobs/:id/contract", to: "jobs_contracts#create_contract"
  post "jobs/:id/contract/release", to: "jobs_contracts#release_contract"
  post "/jobs/deploy", to: "jobs_contracts#deploy_contract"
  # Candidates

  # CV

  # Stats

end
