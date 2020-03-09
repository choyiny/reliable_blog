# Base class to manage connection
module RedisService
  class BaseRedisService
    require 'redis'

    def connection
      unless defined?(@@connection) && @@connection
        @@connection = Redis.new({host: ENV['REDIS_HOST']})
      end
      @@connection
    end

  end
end