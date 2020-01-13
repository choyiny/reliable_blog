# adapted from https://malcoded.com/posts/angular-docker

# stage 1: compile the angular app
FROM node:10 as build-app
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install -g @angular/cli@8.3.21
COPY . .
RUN ng build --prod --configuration=production

# Stage 2: serving the actual app
FROM nginx:alpine
<<<<<<< Updated upstream
COPY --from=build-app /usr/src/app/dist/blog-frontend /usr/share/nginx/html
=======
COPY --from=build-app /usr/src/app/dist/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
>>>>>>> Stashed changes
