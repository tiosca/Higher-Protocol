class JobsController < ApplicationController
    
    before_action :authenticate_user!
    before_action :set_job, only: [:show, :delete]

    # GET /jobs
    def index
        @jobs = Job.all
        json_response(@jobs)
    end

    # GET /jobs/:id
    def show
        json_response(@job)
    end

    # POST /jobs
    def create
        @job = Job.create!(jobs_create_param)
        json_response(@job, :created)
    end

    def jobs_create_param
        params.permit(:job_name, :post_date, :expire_date, 
            :location, :description, :category, :hash, :reward, :contract_conditions)
    end

    # DELETE /jobs/:id
    def destroy
        @job.destroy
        head :no_content
    end

    def set_job
        @job = Job.find(params[:id])
    end
end