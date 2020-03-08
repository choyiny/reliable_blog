# Base class to manage connection
module RedisService
  class BaseRedisService
    require 'redis'

    REDIS_HOST = '127.0.0.1'

    def connection
      unless defined?(@@connection) && @@connection
        @@connection = Redis.new({host: REDIS_HOST})
      end
      @@connection
    end

  end
end