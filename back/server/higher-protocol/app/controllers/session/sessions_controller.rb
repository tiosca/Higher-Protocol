class Session::SessionsController < Devise::SessionsController
    respond_to :json
    

    # def create
    #   @data = {message: "Unauthorized"}
    #   render json: (@data), status: :unauthorized
    # end

    # private
  
    def respond_with(resource, _opts = {})
      render json: resource
    end
  
    def respond_to_on_destroy
      log_out_success && return if current_user
  
      log_out_failure
    end
  
    def log_out_success
      render json: { message: "You are logged out." }, status: :ok
    end
  
    def log_out_failure
      render json: { message: "Hmm nothing happened."}, status: :unauthorized
    end
  end