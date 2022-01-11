class StatsController < ApplicationController


    def initialize
        @stats = File.read( Rails.public_path.join('files/stats.json'))
        # @calendar = File.read( Rails.public_path.join('files/calendar.json'))
    end

    def index
        json_response(@stats)
    end

##########################################

    before_action :authenticate_user!
    before_action :set_meeting, only: [:delete_meeting]
    
    # GET /calendar
    def meetings
        #user_id: @user_id, category: @category,
        if params["from"].present?
            @meetings = Meeting.where("time >= :from", params["from"] )
        else 
            @meetings = Meeting.all
        end
        
        json_response(@meetings)
    end

    # POST /calendar
    def create_meeting
        puts meeting_create_params
        @meeting = Meeting.create!(meeting_create_params)
        json_response(@meeting, :created)
    end

    def delete_meeting
        @meeting.destroy
        head :ok
    end

    def meeting_all_params
        params.permit(:from, :type, :user_id)
    end

    def meeting_create_params
        params.permit(:start_time, :name, :category)
    end

    def set_meeting
        @meeting = Meeting.find(params[:id])
    end
end