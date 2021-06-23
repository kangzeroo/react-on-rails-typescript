# beer model
class Beer < ApplicationRecord
  validates :country, presence: true
end
