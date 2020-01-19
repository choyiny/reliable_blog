# base image
FROM node:13-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@8.3.21

# add app
COPY . /app

# start app
EXPOSE 80
CMD ng serve --host 0.0.0.0 --port 80
