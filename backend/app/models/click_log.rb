class ClickLog < ApplicationRecord
  include RedisService

  after_create :publish_click_log

  def publish_click_log
    RedisService::RedisPublisherService.new(self.to_json, 'click_logs').process
  end
end
