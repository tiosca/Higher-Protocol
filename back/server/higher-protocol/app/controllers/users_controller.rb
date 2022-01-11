class UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_user, only: [:show, :update, :destroy]
  
  def initialize
    @profile = File.read( Rails.public_path.join('files/profile.json'))
  end

  # GET /users
  def index
    @users = User.all
    json_response(@users)
  end

  # GET /profile
  def my_profile
    json_response(current_user)
  end

  # # POST /users
  # def create
  #   @user = User.create!(user_params)
  #   json_response(@user, :created)
  # end

  # # GET /users/:id
  # def show
  #   json_response(@user)
  # end

  # # PUT /users/:id
  # def update
  #   @user.update(user_params)
  #   head :no_content
  # end

  # # DELETE /users/:id
  # def destroy
  #   @user.destroy
  #   head :no_content
  # end

  # def profile
  #   json_response(@profile)
  # end

  # private

  # def user_params
  #   # whitelist params
  #   params.permit(:name, :email, :user_type)
  # end

  # def set_user
  #   @user = User.find(params[:id])
  # end
end