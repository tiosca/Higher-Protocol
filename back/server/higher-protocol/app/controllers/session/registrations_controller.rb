class Session::RegistrationsController < Devise::RegistrationsController
    respond_to :json
    before_action :configure_sign_up_params, only: [:create]

    private
  
    def respond_with(resource, _opts = {})
      register_success && return if resource.persisted?
  
      register_failed
    end
  
    def register_success
      render json: { message: 'Signed up sucessfully.' }
    end
  
    def register_failed
      render json: { message: "Something went wrong." }, status: :unauthorized
    end

    protected 

    def configure_sign_up_params
      devise_parameter_sanitizer.permit(:sign_up, keys: [:email, :password, :first_name ,:last_name, :category])
    end
  end