require 'test_helper'

class BeerTest < ActiveSupport::TestCase
  test 'beer must have country' do
    beer = Beer.new(brand: 'stella', style: 'lager', quantity: 12)
    assert_not beer.valid?, 'missing country'
  end
end
