FROM ruby:2.6.3

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y sqlite3 --no-install-recommends && rm -rf /var/lib/apt/lists/*

RUN gem install bundler:2.0.2

ENV RAILS_ENV production
ENV RAILS_LOG_TO_STDOUT true

COPY Gemfile /usr/src/app/
COPY Gemfile.lock /usr/src/app/
RUN bundle config --global frozen 1
RUN bundle install --without development test

COPY . /usr/src/app
RUN bundle exec rake

RUN bundle exec rake db:migrate

EXPOSE 3000
CMD ["rails", "server", "-b", "0.0.0.0"]