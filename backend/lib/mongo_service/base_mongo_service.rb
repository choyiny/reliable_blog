# Base class to manage connection
module MongoService
  class BaseMongoService
    require 'mongo'

    def connection(url)
      @@connection ||= {}

      unless defined?(@@connection[url]) && @@connection[url]
        @@connection[url] = Mongo::Client.new(url)
      end
      @@connection[url]
    end

  end
end