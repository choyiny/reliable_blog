class ClickLog < ApplicationRecord
  include RedisService

  after_create :publish_click_log

  def publish_click_log
    RedisService::RedisPublisherService.new('click_logs', self).process
  end
end
