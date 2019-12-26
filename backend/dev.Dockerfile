# this is just to zero-setup development environment
FROM ruby:2.6.3

RUN apt-get update && apt-get install -y sqlite3 postgresql postgresql-contrib --no-install-recommends && rm -rf /var/lib/apt/lists/*
RUN gem install bundler:2.0.2

# set working directory
WORKDIR /app

# install dependencies
COPY Gemfile /app/Gemfile
RUN bundle i 

COPY . /app
EXPOSE 80
CMD rails s -b 0.0.0.0 -p 80