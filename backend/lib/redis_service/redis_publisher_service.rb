module RedisService
  class RedisPublisherService < BaseRedisService
    attr_reader :options, :channel

    def initialize(channel, options)
      @channel = channel
      @options = options
    end

    def process
      connection.publish(options, channel)
    end

  end
end