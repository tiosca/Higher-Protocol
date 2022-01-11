class CvDocument < ApplicationRecord
  belongs_to :user

  validates_presence_of :pdf_link, :version
end
