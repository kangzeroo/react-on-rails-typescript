Rails
  .application
  .routes
  .draw do
    namespace :api do
      namespace :v1 do
        get 'beers/index'
        post 'beers/create'
        put 'beers/:id', to: 'beers#update'
        delete 'beers/:id', to: 'beers#destroy'
      end
    end
    root 'beers#index'
  end
