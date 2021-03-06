Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :index, :show, :update]
    resource :session, only: [:new, :show, :create, :destroy]
    resources :tracks
    resources :playlists
    resources :playlist_tracks, only: [:index, :new, :show, :create, :destroy]
  end
  get 'api/upload', :to => 'api/uploads#upload'
end
