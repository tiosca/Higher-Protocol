FactoryBot.define do
  factory :cv_documents do
    pdf_link { Faker::Internet.url }
    version { Faker::App.version }
    user_id nil
  end
end