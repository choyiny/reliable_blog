class ClickLog < ApplicationRecord
  include RedisService

  after_create :publish_click_log

  def publish_click_log
    log = self.to_json
    other_log = JSON.parse(log)
    other_log['id'] = other_log['id'].to_s
    other_log['post_id'] = other_log['post_id'].to_s
    log = other_log.to_json
    p 1234567890
    p log
    RedisService::RedisPublisherService.new(log, 'click_logs').process
  end
end
