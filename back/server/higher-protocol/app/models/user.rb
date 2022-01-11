class User < ApplicationRecord
  has_many :cv_documents,  dependent: :destroy
  has_many :candidates, dependent: :destroy

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist

end
