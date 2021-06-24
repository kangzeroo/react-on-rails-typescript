# beer model
class Beer < ApplicationRecord
  validates :country, presence: true

  def self.from_deutschland?
    where('country = ?', 'Deutschland')
  end
end
