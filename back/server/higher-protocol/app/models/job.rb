class Job < ApplicationRecord
    has_many :job_contracts, dependent: :destroy
end