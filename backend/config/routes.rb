Rails.application.routes.draw do
  resources :comments
  resources :posts
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  post 'authenticate', to: 'authentication#authenticate'
  post 'register', to: 'authentication#register'

  get 'error', to: 'test#error'

  get '', to: 'index#index'
end
