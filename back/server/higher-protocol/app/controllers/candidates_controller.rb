
class CandidatesController < ApplicationController

    before_action :authenticate_user!
    before_action :set_candidate, only: [:show, :update, :destroy]

    def initialize
        # @candidates = File.read( Rails.public_path.join('files/candidates.json'))
        # @candidate_id = File.read( Rails.public_path.join('files/candidate_id.json'))
    end

    # GET /candidates
    def index
        @candidates = Candidate.select(:id, :personal_details, :position, 
            :user_id, :position, :starting_date, :location, :is_remote, :match_score).all
        json_response(@candidates)
    end

    # GET /candidates/:id
    def show
        @user = User.where("id = ?", @candidate.user_id).first
        json_response({"user" => @user, "details" => @candidate}, :ok)
    end

    # POST /candidates
    def create
        puts candidate_params
        @candidate = Candidate.create!(candidate_params)
        json_response(@candidate, :created)
    end

    # DELETE /candidates/:id
    def destroy
        @candidate.destroy
        head :no_content
    end

    # PUT /candidates/:id
    def update
        @candidate.update(candidate_params)
        json_response(@candidate, :accepted)
    end

    def set_candidate
        @candidate = Candidate.find(params[:id])
    end

    def candidate_params
        params.permit(:about, :details, :position, :location, :starting_date, :is_remote, :experiences, 
        :degree, :licences, :hard_skills, :soft_skills, :contact_details, :match_score, :personal_details, :user_id)
    end

end