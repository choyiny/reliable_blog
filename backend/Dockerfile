FROM ruby:2.6.5-alpine3.11

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apk update \
    && apk add postgresql-dev postgresql-client build-base libxml2-dev libxslt-dev \
    && rm -rf /var/cache/apk/*
    && gem install bundler:2.0.2

ENV RAILS_ENV production
ENV RAILS_LOG_TO_STDOUT true

COPY Gemfile /usr/src/app/
COPY Gemfile.lock /usr/src/app/
RUN bundle config --global frozen 1
RUN bundle install --without development test

COPY . /usr/src/app
RUN bundle exec rake

EXPOSE 3000
CMD ["rails", "server", "-b", "0.0.0.0"]