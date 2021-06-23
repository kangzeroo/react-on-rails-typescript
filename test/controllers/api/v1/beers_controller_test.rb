require 'test_helper'

# beer tests
class Api::V1::BeersControllerTest < ActionDispatch::IntegrationTest
  test 'should get index' do
    get api_v1_beers_index_url
    assert_response :success
  end
end
