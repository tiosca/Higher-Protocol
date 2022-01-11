FactoryBot.define do
  factory :user do
    name { Faker::Games::WorldOfWarcraft.hero }
    email { Faker::Internet.email }
    user_type { "candidate" }
  end
end